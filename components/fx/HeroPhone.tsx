"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* The hero's 3D piece: a phone showing "your" website. The site on the
   screen eases through different brand palettes (same layout, different
   brand), and now and then a WhatsApp enquiry slides in, which is the
   thing a customer actually wants from a website. The phone floats, sways
   a little and leans toward the pointer. */

type Palette = { name: string; bg: string; surface: string; ink: string; muted: string; accent: string; onAccent: string };

const PALETTES: Palette[] = [
  { name: "graphite & brass", bg: "#2b2d31", surface: "#3a3d43", ink: "#f1efea", muted: "#aeaba4", accent: "#d1ad66", onAccent: "#1f2124" },
  { name: "wine & brass", bg: "#1a0a10", surface: "#33111e", ink: "#f4ece2", muted: "#bfa9a0", accent: "#d6b06b", onAccent: "#1a0a10" },
  { name: "royal purple", bg: "#412d63", surface: "#55407c", ink: "#f3eef8", muted: "#c9bddc", accent: "#d8b25c", onAccent: "#1a1226" },
  { name: "studio light", bg: "#ecebe6", surface: "#ffffff", ink: "#171914", muted: "#5d6058", accent: "#1f5f46", onAccent: "#ffffff" },
  { name: "burgundy & marigold", bg: "#641f36", surface: "#7a2b47", ink: "#f5f0eb", muted: "#dcc4c9", accent: "#f7a93b", onAccent: "#2b1a20" },
];

const W = 540;
const H = 1140;
const SANS = '"Space Grotesk Variable", system-ui, sans-serif';
const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const mix = (a: string, b: string, t: number) => "#" + new THREE.Color(a).lerp(new THREE.Color(b), t).getHexString();
function blend(a: Palette, b: Palette, t: number): Palette {
  return {
    name: t < 0.5 ? a.name : b.name,
    bg: mix(a.bg, b.bg, t),
    surface: mix(a.surface, b.surface, t),
    ink: mix(a.ink, b.ink, t),
    muted: mix(a.muted, b.muted, t),
    accent: mix(a.accent, b.accent, t),
    onAccent: mix(a.onAccent, b.onAccent, t),
  };
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Draws the little website. `toast` is 0 (hidden) to 1 (fully in). */
function drawScreen(ctx: CanvasRenderingContext2D, p: Palette, toast: number) {
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  rr(ctx, 0, 0, W, H, 62);
  ctx.clip();
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, W, H);

  // Status bar
  ctx.fillStyle = p.ink;
  ctx.font = `600 24px ${SANS}`;
  ctx.fillText("9:41", 48, 58);
  rr(ctx, W - 98, 40, 50, 22, 6);
  ctx.globalAlpha = 0.85;
  ctx.fill();
  ctx.globalAlpha = 1;
  // Dynamic island
  ctx.fillStyle = "#0b0b0c";
  rr(ctx, W / 2 - 70, 30, 140, 40, 20);
  ctx.fill();

  // Nav
  ctx.fillStyle = p.accent;
  ctx.beginPath();
  ctx.arc(66, 132, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = p.ink;
  ctx.font = `600 28px ${SANS}`;
  ctx.fillText("Your Business", 96, 142);
  ctx.fillRect(W - 84, 122, 36, 3);
  ctx.fillRect(W - 84, 132, 36, 3);
  ctx.fillRect(W - 84, 142, 24, 3);

  // Hero
  ctx.fillStyle = p.accent;
  ctx.font = `500 20px ${MONO}`;
  ctx.fillText("NOW BOOKING", 48, 236);
  ctx.fillStyle = p.ink;
  ctx.font = `600 64px ${SANS}`;
  ["Your brand,", "online and", "unmissable."].forEach((l, i) => ctx.fillText(l, 46, 312 + i * 70));
  ctx.fillStyle = p.muted;
  ctx.globalAlpha = 0.55;
  [400, 360, 250].forEach((w, i) => {
    rr(ctx, 48, 498 + i * 30, w, 13, 6);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Buttons
  ctx.fillStyle = p.accent;
  rr(ctx, 48, 612, 270, 72, 14);
  ctx.fill();
  ctx.fillStyle = p.onAccent;
  ctx.font = `600 24px ${SANS}`;
  ctx.fillText("Book on WhatsApp", 72, 657);
  ctx.strokeStyle = p.ink;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2;
  rr(ctx, 334, 612, 158, 72, 14);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = p.ink;
  ctx.fillText("Prices", 378, 657);

  // Feature image
  const g = ctx.createLinearGradient(48, 720, W - 48, 900);
  g.addColorStop(0, p.surface);
  g.addColorStop(1, p.accent);
  ctx.fillStyle = g;
  rr(ctx, 48, 720, W - 96, 190, 22);
  ctx.fill();
  ctx.fillStyle = p.bg;
  ctx.globalAlpha = 0.28;
  ctx.beginPath();
  ctx.arc(W - 150, 810, 70, 0, Math.PI * 2);
  ctx.fill();
  rr(ctx, 84, 840, 180, 20, 10);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Price cards
  [0, 1].forEach((i) => {
    const x = 48 + i * 230;
    ctx.fillStyle = p.surface;
    rr(ctx, x, 940, 214, 150, 18);
    ctx.fill();
    ctx.fillStyle = p.muted;
    ctx.globalAlpha = 0.7;
    rr(ctx, x + 20, 966, 110, 12, 6);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = p.accent;
    ctx.font = `600 30px ${SANS}`;
    ctx.fillText(i === 0 ? "₦150,000" : "₦320,000", x + 20, 1030);
    ctx.fillStyle = p.muted;
    ctx.font = `400 18px ${SANS}`;
    ctx.fillText(i === 0 ? "Starter" : "Signature", x + 20, 1064);
  });

  // WhatsApp enquiry notification
  if (toast > 0.001) {
    const y = -150 + toast * 238;
    ctx.globalAlpha = Math.min(toast * 1.6, 1);
    ctx.fillStyle = "rgba(250, 250, 248, 0.96)";
    rr(ctx, 26, y, W - 52, 124, 26);
    ctx.fill();
    ctx.fillStyle = "#25d366";
    rr(ctx, 48, y + 24, 44, 44, 12);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(70, y + 46, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6b6e74";
    ctx.font = `500 18px ${SANS}`;
    ctx.fillText("WHATSAPP · now", 108, y + 42);
    ctx.fillStyle = "#16181b";
    ctx.font = `600 22px ${SANS}`;
    ctx.fillText("New enquiry from your website", 108, y + 72);
    ctx.fillStyle = "#4a4d52";
    ctx.font = `400 20px ${SANS}`;
    ctx.fillText("“Hi! I'd like to book for Saturday…”", 108, y + 100);
    ctx.globalAlpha = 1;
  }

  // Palette name, like a token in the code window
  ctx.font = `500 18px ${MONO}`;
  const label = `palette: ${p.name}`;
  const lw = ctx.measureText(label).width + 32;
  ctx.fillStyle = p.surface;
  rr(ctx, (W - lw) / 2, H - 52, lw, 34, 17);
  ctx.fill();
  ctx.fillStyle = p.muted;
  ctx.fillText(label, (W - lw) / 2 + 16, H - 29);
  ctx.restore();
}

export default function HeroPhone({ glow }: { glow: string }) {
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
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0, 6.4);
    const key = new THREE.DirectionalLight("#fff1d6", 1.6);
    key.position.set(4, 5, 6);
    scene.add(key, new THREE.AmbientLight("#ffffff", 0.3));
    const rim = new THREE.DirectionalLight(glow, 1.6);
    rim.position.set(-5, -2, -4);
    scene.add(rim);

    // Phone: graphite body over a slightly larger brass frame, so a thin
    // brass rim catches the light at the edges.
    const phone = new THREE.Group();
    const frameGeo = new RoundedBoxGeometry(1.1, 2.24, 0.1, 6, 0.15);
    const bodyGeo = new RoundedBoxGeometry(1.08, 2.22, 0.12, 6, 0.14);
    const brass = new THREE.MeshStandardMaterial({ color: "#a8864a", metalness: 0.9, roughness: 0.44, envMapIntensity: 0.5 });
    const body = new THREE.MeshStandardMaterial({ color: "#1d1f22", metalness: 0.5, roughness: 0.4, envMapIntensity: 0.7 });
    phone.add(new THREE.Mesh(frameGeo, brass), new THREE.Mesh(bodyGeo, body));
    const btnGeo = new THREE.BoxGeometry(0.03, 0.22, 0.05);
    [0.42, 0.12].forEach((y) => {
      const b = new THREE.Mesh(btnGeo, brass);
      b.position.set(0.56, y, 0);
      phone.add(b);
    });

    const screen = document.createElement("canvas");
    screen.width = W;
    screen.height = H;
    const ctx = screen.getContext("2d")!;
    const tex = new THREE.CanvasTexture(screen);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const screenMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false });
    const screenGeo = new THREE.PlaneGeometry(1.0, 1.0 * (H / W));
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.062;
    phone.add(screenMesh);
    // Faint glass reflection across the screen.
    const glassMat = new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.04, toneMapped: false });
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.0 * (H / W)), glassMat);
    glass.position.z = 0.064;
    phone.add(glass);
    scene.add(phone);

    // Palette cycle + notification timing.
    let index = 0;
    let since = 0;
    const HOLD = 3.2;
    const FADE = 1.1;
    let toastClock = 2.5;
    let lastKey = "";
    const paint = (dt: number) => {
      since += dt;
      toastClock += dt;
      if (since > HOLD + FADE) {
        index = (index + 1) % PALETTES.length;
        since = 0;
      }
      const t = since > HOLD ? easeInOut((since - HOLD) / FADE) : 0;
      const pal = blend(PALETTES[index], PALETTES[(index + 1) % PALETTES.length], t);
      // Notification: in at 0s, holds 2.6s, out by 3.4s, every 8s.
      const c = toastClock % 8;
      const toast = c < 0.5 ? easeInOut(c / 0.5) : c < 3 ? 1 : c < 3.5 ? 1 - easeInOut((c - 3) / 0.5) : 0;
      // Only redraw while something on the screen is actually changing.
      const key = `${index}:${t.toFixed(3)}:${toast.toFixed(3)}`;
      if (key === lastKey) return;
      lastKey = key;
      drawScreen(ctx, pal, toast);
      tex.needsUpdate = true;
    };

    const tilt = new THREE.Vector2();
    const tiltTarget = new THREE.Vector2();
    const onMove = (e: PointerEvent) =>
      tiltTarget.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
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
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) start();
    });
    io.observe(canvas);

    let raf = 0;
    let elapsed = 0;
    let prev = performance.now();
    const draw = (now: number) => {
      const real = Math.min((now - prev) / 1000, 0.5);
      const dt = Math.min(real, 0.05);
      prev = now;
      if (!reduce) {
        elapsed += dt;
        tilt.lerp(tiltTarget, 1 - Math.pow(0.05, dt));
        paint(real); // the screen keeps real time, even on a slow device
      }
      phone.rotation.set(0.05 + tilt.y * 0.08, -0.2 + Math.sin(elapsed * 0.45) * 0.06 + tilt.x * 0.12, 0.015);
      phone.position.y = Math.sin(elapsed * 0.9) * 0.04;
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

    // Wait for the site fonts so the screen text is drawn in Space Grotesk.
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      drawScreen(ctx, PALETTES[0], 0);
      tex.needsUpdate = true;
      if (reduce) draw(performance.now());
      else start();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      [frameGeo, bodyGeo, btnGeo, screenGeo, glass.geometry].forEach((g) => g.dispose());
      [brass, body, screenMat, glassMat].forEach((m) => m.dispose());
      tex.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, [glow]);

  return (
    <canvas
      ref={ref}
      className="hero-phone"
      role="img"
      aria-label="A phone showing an example business website, changing between brand colour palettes"
    />
  );
}
