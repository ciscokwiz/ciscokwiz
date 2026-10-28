"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* The site background: a 48px blueprint grid drawn in a shader.
   Around the pointer the grid swells slightly (a soft lens) and a glow sits
   behind it; two faint colour clouds drift across the page; the grid moves a
   little slower than the page when you scroll. */

const GLOWS = {
  brass: "#d1ad66",
  blue: "#8fb2f5",
} as const;
export type GlowName = keyof typeof GLOWS;

/* Colours per theme. Light mode deepens the glow so it still reads on paper. */
const THEMES = {
  dark: { base: "#2b2d31", line: "#f1efea", glow: GLOWS, cloudA: "#6f8fd6", cloudB: "#d1ad66" },
  light: { base: "#f0efeb", line: "#1c1d20", glow: { brass: "#b08a3e", blue: "#4a78e0" }, cloudA: "#7f9be0", cloudB: "#d9b56c" },
} as const;
const currentTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

// The shader writes straight to the screen, so colours stay as authored
// (sRGB) instead of being converted to three's linear working space.
const raw = (hex: string) => new THREE.Color().setStyle(hex, THREE.LinearSRGBColorSpace);

const vertex = /* glsl */ `
  void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform vec2 uView;      // viewport in CSS px
  uniform float uDpr;
  uniform vec2 uMouse;     // CSS px, origin top-left
  uniform float uPresence; // 0 when the pointer is away, 1 when it's here
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uBase;
  uniform vec3 uLine;
  uniform vec3 uGlow;
  uniform vec3 uCloudA;
  uniform vec3 uCloudB;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    vec2 p = vec2(gl_FragCoord.x, uView.y * uDpr - gl_FragCoord.y) / uDpr;

    // Soft lens: sample coordinates are pulled toward the pointer,
    // so cells under it render up to ~16% larger. Not enough to distract.
    vec2 d = p - uMouse;
    float r2 = dot(d, d);
    float lens = 0.16 * uPresence * exp(-r2 / (170.0 * 170.0));
    vec2 q = uMouse + d * (1.0 - lens);

    // Grid, moving at 35% of the scroll speed.
    vec2 g = (q + vec2(0.0, uScroll * 0.35)) / 48.0;
    vec2 w = fwidth(g);
    vec2 f = abs(fract(g - 0.5) - 0.5) / max(w, 1e-4);
    float line = 1.0 - min(min(f.x, f.y), 1.0);

    // Glow behind the grid, brighter lines near the pointer.
    float glow = uPresence * exp(-r2 / (300.0 * 300.0));
    float near = uPresence * exp(-r2 / (150.0 * 150.0));

    // Two slow colour clouds so the page isn't flat grey.
    vec2 uv = p / uView;
    vec2 ca = vec2(0.78 + 0.10 * sin(uTime * 0.05), 0.18 + 0.08 * cos(uTime * 0.04));
    vec2 cb = vec2(0.15 + 0.08 * cos(uTime * 0.035), 0.82 + 0.07 * sin(uTime * 0.045));
    float aspect = uView.x / uView.y;
    float cloudA = exp(-dot((uv - ca) * vec2(aspect, 1.0), (uv - ca) * vec2(aspect, 1.0)) / 0.18);
    float cloudB = exp(-dot((uv - cb) * vec2(aspect, 1.0), (uv - cb) * vec2(aspect, 1.0)) / 0.22);

    // Tint toward each colour (rather than add light) so it works on a dark
    // or a light base.
    vec3 col = uBase;
    col = mix(col, uCloudA, cloudA * 0.08);
    col = mix(col, uCloudB, cloudB * 0.065);
    col = mix(col, uGlow, glow * 0.14);

    float lineAlpha = 0.055 + near * 0.38 + glow * 0.08;
    vec3 lineCol = mix(uLine, uGlow, clamp(near * 1.4, 0.0, 1.0));
    col = mix(col, lineCol, line * lineAlpha);

    // A touch of noise stops the gradients from banding.
    col += (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function GridCanvas({ glow }: { glow: GlowName }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
    } catch {
      document.documentElement.classList.add("no-webgl");
      return;
    }
    document.documentElement.classList.add("has-grid");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uView: { value: new THREE.Vector2(1, 1) },
      uDpr: { value: 1 },
      uMouse: { value: new THREE.Vector2(-9999, -9999) },
      uPresence: { value: 0 },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uBase: { value: raw("#2b2d31") },
      uLine: { value: raw("#f1efea") },
      uGlow: { value: raw(GLOWS[glow]) },
      uCloudA: { value: raw("#6f8fd6") },
      uCloudB: { value: raw("#d1ad66") },
    };
    const applyTheme = () => {
      const t = THEMES[currentTheme()];
      uniforms.uBase.value = raw(t.base);
      uniforms.uLine.value = raw(t.line);
      uniforms.uGlow.value = raw(t.glow[glow]);
      uniforms.uCloudA.value = raw(t.cloudA);
      uniforms.uCloudB.value = raw(t.cloudB);
    };
    applyTheme();
    // Follow the theme toggle live.
    const themeWatch = new MutationObserver(() => {
      applyTheme();
      if (reduce) draw(performance.now());
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      uniforms.uView.value.set(window.innerWidth, window.innerHeight);
      uniforms.uDpr.value = renderer.getPixelRatio();
    };
    size();

    // Pointer: eased toward the target so the glow trails the cursor.
    const target = new THREE.Vector2(window.innerWidth * 0.72, window.innerHeight * 0.3);
    const mouse = target.clone();
    let present = 0;
    let lastTouch = -1e9;
    let mouseInside = false;
    let seen = false;
    const onMove = (e: PointerEvent) => {
      target.set(e.clientX, e.clientY);
      if (!seen) mouse.copy(target);
      seen = true;
      if (e.pointerType === "mouse") mouseInside = true;
      else lastTouch = performance.now();
      if (reduce) draw(performance.now());
    };
    const onLeave = () => (mouseInside = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let prev = performance.now();
    const draw = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      // A mouse keeps the glow until it leaves the window; a touch holds it
      // for a moment, then it goes back to drifting.
      const active = mouseInside || now - lastTouch < 2500;
      // With no pointer (phones, or idle), the glow drifts on its own.
      if (!active && !reduce) {
        const t = now / 1000;
        target.set(
          window.innerWidth * (0.62 + 0.22 * Math.sin(t * 0.21)),
          window.innerHeight * (0.34 + 0.16 * Math.sin(t * 0.17 + 1.3)),
        );
      }
      const ease = reduce ? 1 : 1 - Math.pow(0.0008, dt);
      mouse.lerp(target, ease);
      present += ((active ? 1 : 0.55) - present) * (reduce ? 1 : 1 - Math.pow(0.02, dt));
      uniforms.uMouse.value.copy(mouse);
      uniforms.uPresence.value = present;
      uniforms.uTime.value = reduce ? 0 : now / 1000;
      uniforms.uScroll.value = window.scrollY;
      renderer.render(scene, camera);
    };
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) draw(performance.now());
      else raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    const onResize = () => {
      size();
      if (reduce) draw(performance.now());
    };
    const onScroll = () => reduce && draw(performance.now());
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      cancelAnimationFrame(raf);
      themeWatch.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      document.documentElement.classList.remove("has-grid");
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [glow]);

  return <canvas ref={ref} className="grid-canvas" aria-hidden="true" />;
}
