"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* The hero's 3D piece: 27 blocks fly in and assemble into a cube (a brand,
   built piece by piece), tilt toward the pointer, give the odd Rubik's twist,
   and drift apart as you scroll past the hero. */

const SPACING = 1.04;
const BRASS_CELLS = new Set(["1,1,1", "-1,1,1", "1,-1,1", "1,1,-1", "0,0,1", "-1,-1,-1"]);

type Block = {
  mesh: THREE.Object3D;
  cell: THREE.Vector3;
  from: THREE.Vector3;
  fromQuat: THREE.Quaternion;
  homeQuat: THREE.Quaternion;
  delay: number;
};

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function BrandCube({ glow }: { glow: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 11);

    scene.add(new THREE.AmbientLight("#ffffff", 0.35));
    const key = new THREE.DirectionalLight("#fff1d6", 2.2);
    key.position.set(5, 7, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(glow, 2.4);
    rim.position.set(-6, -3, -5);
    scene.add(rim);

    const geo = new RoundedBoxGeometry(0.92, 0.92, 0.92, 4, 0.09);
    const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.94, 0.94, 0.94));
    const graphite = new THREE.MeshStandardMaterial({ color: "#3a3d43", metalness: 0.6, roughness: 0.36, envMapIntensity: 0.9 });
    const brass = new THREE.MeshStandardMaterial({ color: "#c79c4f", metalness: 0.95, roughness: 0.3, envMapIntensity: 0.75 });
    const edgeMat = new THREE.LineBasicMaterial({ color: "#d1ad66", transparent: true, opacity: 0.35 });

    const spin = new THREE.Group(); // pointer tilt + idle rotation
    const root = new THREE.Group(); // holds the blocks
    spin.add(root);
    scene.add(spin);

    const blocks: Block[] = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const isBrass = BRASS_CELLS.has(`${x},${y},${z}`);
          const holder = new THREE.Group();
          holder.add(new THREE.Mesh(geo, isBrass ? brass : graphite));
          if (!isBrass) holder.add(new THREE.LineSegments(edgeGeo, edgeMat));
          const cell = new THREE.Vector3(x, y, z);
          const dir = new THREE.Vector3(x || Math.random() - 0.5, y || Math.random() - 0.5, z || Math.random() - 0.5).normalize();
          const from = dir.multiplyScalar(5 + Math.random() * 4);
          const fromQuat = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
          );
          root.add(holder);
          blocks.push({ mesh: holder, cell, from, fromQuat, homeQuat: new THREE.Quaternion(), delay: Math.random() * 0.7 });
        }

    // Pointer tilt, measured against the whole window.
    const tilt = new THREE.Vector2();
    const tiltTarget = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      tiltTarget.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const size = () => {
      const r = canvas.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / Math.max(r.height, 1);
      camera.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(() => {
      size();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);

    // Rubik's twist state.
    let twist: { pivot: THREE.Group; axis: "x" | "y" | "z"; dir: number; t: number; members: Block[] } | null = null;
    let nextTwist = 2.6;
    const tmpM = new THREE.Matrix4();

    const startTwist = () => {
      const axis = (["x", "y", "z"] as const)[Math.floor(Math.random() * 3)];
      const layer = Math.floor(Math.random() * 3) - 1;
      const members = blocks.filter((b) => b.cell[axis] === layer);
      const pivot = new THREE.Group();
      root.add(pivot);
      members.forEach((b) => pivot.attach(b.mesh));
      twist = { pivot, axis, dir: Math.random() < 0.5 ? 1 : -1, t: 0, members };
    };
    const endTwist = () => {
      if (!twist) return;
      for (const b of twist.members) {
        root.attach(b.mesh);
        b.cell.copy(b.mesh.position).divideScalar(SPACING).round();
        // Snap the orientation to exact right angles so errors never build up.
        tmpM.makeRotationFromQuaternion(b.mesh.quaternion);
        const e = tmpM.elements;
        for (const i of [0, 1, 2, 4, 5, 6, 8, 9, 10]) e[i] = Math.round(e[i]);
        b.homeQuat.setFromRotationMatrix(tmpM);
        b.mesh.quaternion.copy(b.homeQuat);
      }
      root.remove(twist.pivot);
      twist = null;
    };

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) start();
    });
    io.observe(canvas);

    let raf = 0;
    let elapsed = reduce ? 10 : 0;
    let prev = performance.now();
    const pos = new THREE.Vector3();
    const draw = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (!reduce) elapsed += dt;

      // 0 at the top of the page, 1 once the hero has scrolled away.
      const hero = canvas.closest(".hero");
      const scatter = hero ? Math.min(Math.max(window.scrollY / (hero.clientHeight * 0.85), 0), 1) : 0;

      for (const b of blocks) {
        if (twist && twist.members.includes(b)) continue;
        const p = reduce ? 1 : ease(Math.min(Math.max((elapsed - b.delay) / 1.3, 0), 1));
        pos.copy(b.cell).multiplyScalar(SPACING);
        const spread = scatter * scatter * 2.2;
        pos.addScaledVector(b.cell, spread);
        b.mesh.position.lerpVectors(b.from, pos, p);
        b.mesh.quaternion.slerpQuaternions(b.fromQuat, b.homeQuat, p);
      }

      if (!reduce) {
        if (twist) {
          twist.t += dt / 0.6;
          twist.pivot.rotation[twist.axis] = (twist.dir * Math.PI) / 2 * easeInOut(Math.min(twist.t, 1));
          if (twist.t >= 1) endTwist();
        } else if (elapsed > nextTwist && scatter < 0.02) {
          startTwist();
          nextTwist = elapsed + 2.4 + Math.random() * 1.6;
        }
        tilt.lerp(tiltTarget, 1 - Math.pow(0.02, dt));
        spin.rotation.y += dt * 0.14;
      }
      root.rotation.set(0.5 + tilt.y * 0.22, 0.65 + tilt.x * 0.3, 0);
      spin.position.y = reduce ? 0 : Math.sin(elapsed * 0.8) * 0.08;
      canvas.style.opacity = String(1 - scatter * 0.85);
      renderer.render(scene, camera);
    };
    const loop = (now: number) => {
      draw(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      prev = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => !document.hidden && !reduce && visible && start();
    document.addEventListener("visibilitychange", onVisibility);
    const onScroll = () => reduce && draw(performance.now());
    window.addEventListener("scroll", onScroll, { passive: true });
    if (reduce) requestAnimationFrame(() => draw(performance.now()));
    else start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      geo.dispose();
      edgeGeo.dispose();
      graphite.dispose();
      brass.dispose();
      edgeMat.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, [glow]);

  return <canvas ref={ref} className="brand-cube" aria-hidden="true" />;
}
