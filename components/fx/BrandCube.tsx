"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* The hero's 3D piece, kept quiet on purpose: a finished cube of brand
   blocks that fades in, turns slowly, leans a little toward the pointer and
   fades out as the hero scrolls away. No assembly, no twists. */

const SPACING = 1.04;
const BRASS_CELLS = new Set(["1,1,1", "-1,1,1", "1,1,-1"]);

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
    const key = new THREE.DirectionalLight("#fff1d6", 2.0);
    key.position.set(5, 7, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(glow, 1.8);
    rim.position.set(-6, -3, -5);
    scene.add(rim);

    const geo = new RoundedBoxGeometry(0.92, 0.92, 0.92, 4, 0.09);
    const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.94, 0.94, 0.94));
    const graphite = new THREE.MeshStandardMaterial({ color: "#3a3d43", metalness: 0.6, roughness: 0.38, envMapIntensity: 0.85 });
    const brass = new THREE.MeshStandardMaterial({ color: "#c79c4f", metalness: 0.95, roughness: 0.32, envMapIntensity: 0.7 });
    const edgeMat = new THREE.LineBasicMaterial({ color: "#d1ad66", transparent: true, opacity: 0.22 });

    const cube = new THREE.Group();
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const isBrass = BRASS_CELLS.has(`${x},${y},${z}`);
          const block = new THREE.Group();
          block.add(new THREE.Mesh(geo, isBrass ? brass : graphite));
          if (!isBrass) block.add(new THREE.LineSegments(edgeGeo, edgeMat));
          block.position.set(x, y, z).multiplyScalar(SPACING);
          cube.add(block);
        }
    scene.add(cube);

    // A small lean toward the pointer, measured against the whole window.
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

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) start();
    });
    io.observe(canvas);

    let raf = 0;
    let turn = 0;
    let prev = performance.now();
    const draw = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (!reduce) {
        turn += dt * 0.06;
        tilt.lerp(tiltTarget, 1 - Math.pow(0.05, dt));
      }
      cube.rotation.set(0.5 + tilt.y * 0.1, 0.65 + turn + tilt.x * 0.14, 0);

      // Fade out as the hero scrolls away.
      const hero = canvas.closest(".hero");
      const away = hero ? Math.min(Math.max(window.scrollY / (hero.clientHeight * 0.7), 0), 1) : 0;
      canvas.style.opacity = String(1 - away);
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
    canvas.classList.add("is-ready");

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
