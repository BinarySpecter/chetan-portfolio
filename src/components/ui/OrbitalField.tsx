"use client";

import { useEffect, useRef } from "react";

/*
 * A deterministic ASCII study of an abstract orbital object.
 *
 * The geometry is a small torus wrapped by two dotted rings and a sparse
 * particle field. Points are projected to a fixed monospace character grid,
 * so the result reads as a wireframe print rather than a 3D render.
 *
 * The canvas is decorative: it never participates in layout, pauses when it
 * leaves the viewport, renders one static frame when reduced motion is
 * requested, and reuses the site's palette tokens.
 */

type RGB = [number, number, number];

const TAU = Math.PI * 2;
const GLYPHS = ["\u00b7", "\u00b7", ":", "+", "+", "*"];
const FRAME_MS = 1000 / 24;

function parseColor(value: string, fallback: RGB): RGB {
  const v = value.trim();
  if (v.startsWith("#")) {
    let hex = v.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    if (hex.length === 6) {
      const num = parseInt(hex, 16);
      if (!Number.isNaN(num)) return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
  }

  const match = v.match(/rgba?\(([^)]+)\)/i);
  if (match) {
    const parts = match[1].split(",").map((part) => parseFloat(part));
    if (parts.length >= 3) return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
  }

  return fallback;
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function rotate(x: number, y: number, z: number, rx: number, ry: number, rz: number) {
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;

  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const y1 = y * cx - z1 * sx;
  const z2 = y * sx + z1 * cx;

  const cz = Math.cos(rz);
  const sz = Math.sin(rz);
  return [x1 * cz - y1 * sz, x1 * sz + y1 * cz, z2] as const;
}

function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = seeded(20261024);
const dust = Array.from({ length: 120 }, () => {
  const angle = random() * TAU;
  const radius = 0.55 + random() * 1.65;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.86,
    z: (random() - 0.5) * 1.6,
    weight: random(),
  };
});

export function OrbitalField({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hostNode = hostRef.current;
    const canvasNode = canvasRef.current;
    if (!hostNode || !canvasNode) return;

    const host: HTMLDivElement = hostNode;
    const canvas: HTMLCanvasElement = canvasNode;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const ctx = context;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(pointer: fine)");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let cellW = 8;
    let cellH = 11.5;
    let font = '500 10px "Geist Mono", ui-monospace, monospace';

    let intensity = new Float32Array(0);
    let accentMix = new Float32Array(0);
    let glyphIndex = new Uint8Array(0);

    let accent: RGB = [164, 95, 129];
    let neutral: RGB = [139, 130, 124];

    let rafId = 0;
    let running = false;
    let visible = true;
    let disposed = false;
    let time = 0.65;
    let lastFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    const interactive = () => !motionQuery.matches && finePointerQuery.matches;

    function readTokens() {
      const styles = getComputedStyle(document.documentElement);
      accent = parseColor(styles.getPropertyValue("--accent"), accent);
      neutral = parseColor(styles.getPropertyValue("--faint"), neutral);
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      cellW = width < 460 ? 6.6 : width < 720 ? 7.4 : 8.2;
      cellH = cellW * 1.42;
      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);

      intensity = new Float32Array(cols * rows);
      accentMix = new Float32Array(cols * rows);
      glyphIndex = new Uint8Array(cols * rows);

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontSize = Math.min(cellH * 0.94, cellW / 0.62);
      font = `600 ${fontSize.toFixed(2)}px "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      drawFrame();
    }

    function deposit(
      x: number,
      y: number,
      weight: number,
      accentAmount: number,
      glyph: number,
    ) {
      const px = x / width;
      const py = y / height;
      if (px < 0 || px >= 1 || py < 0 || py >= 1) return;

      const col = Math.floor(px * cols);
      const row = Math.floor(py * rows);
      const index = row * cols + col;
      if (weight <= intensity[index]) return;

      intensity[index] = weight;
      accentMix[index] = accentAmount;
      glyphIndex[index] = glyph;
    }

    function drawFrame() {
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);
      intensity.fill(0);
      accentMix.fill(0);
      glyphIndex.fill(0);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width * 0.31, height * 0.4);
      const drift = Math.sin(time * 0.24);
      const tiltX = 0.62 + pointerY * 0.12 + drift * 0.035;
      const tiltZ = -0.28 + pointerX * 0.06;
      const spinY = 0.28 + pointerX * 0.3 + drift * 0.03;

      type Projected = { x: number; y: number; depth: number };

      function project(px: number, py: number, pz: number, rx: number, ry: number, rz: number) {
        const [vx, vy, vz] = rotate(px, py, pz, rx, ry, rz);
        const depth = clamp((vz + 1.4) / 2.8, 0, 1);
        const perspective = 1 / (1 - vz * 0.3);
        return {
          x: cx + vx * scale * perspective,
          y: cy + vy * scale * perspective,
          depth,
        } satisfies Projected;
      }

      function stroke(
        a: Projected,
        b: Projected,
        glyph: number,
        baseWeight: number,
        depthWeight: number,
        baseAccent: number,
        accentWeight: number,
      ) {
        const distance = Math.hypot(b.x - a.x, b.y - a.y);
        const steps = Math.max(1, Math.ceil(distance / (cellW * 0.7)));

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const depth = a.depth + (b.depth - a.depth) * t;
          deposit(
            a.x + (b.x - a.x) * t,
            a.y + (b.y - a.y) * t,
            baseWeight + depth * depthWeight,
            baseAccent + depth * accentWeight,
            glyph,
          );
        }
      }

      /* Particle field: sparse, far depth. */
      for (const point of dust) {
        const projected = project(
          point.x,
          point.y,
          point.z,
          tiltX * 0.9,
          0.2 + Math.sin(time * 0.18) * 0.08,
          tiltZ,
        );
        deposit(
          projected.x,
          projected.y,
          0.08 + point.weight * 0.14,
          0.2 + projected.depth * 0.2,
          point.weight > 0.9 ? 2 : 0,
        );
      }

      /* Main body: a continuous wireframe torus. Meridians carry the
         brighter lattice; parallels stay quieter so the hole holds. */
      const major = 1.05;
      const minor = 0.17;

      const torusPoint = (theta: number, phi: number): Projected => {
        const wobble = 1 + Math.sin(theta * 3 + time * 0.3) * 0.014;
        const tube = minor * (1 + Math.sin(theta * 2 + phi * 3) * 0.04);
        const ring = major * wobble + tube * Math.cos(phi);
        return project(
          ring * Math.cos(theta),
          ring * Math.sin(theta),
          tube * Math.sin(phi),
          tiltX,
          spinY + theta * 0.02,
          tiltZ,
        );
      };

      for (let meridian = 0; meridian < 9; meridian++) {
        const phi = (meridian / 9) * TAU;
        let previous = torusPoint(0, phi);

        for (let step = 1; step <= 64; step++) {
          const point = torusPoint((step / 64) * TAU, phi);
          stroke(previous, point, 3, 0.3, 0.62, 0.36, 0.62);
          previous = point;
        }
      }

      for (let parallel = 0; parallel < 7; parallel++) {
        const theta = (parallel / 7) * TAU;
        let previous = torusPoint(theta, 0);

        for (let step = 1; step <= 40; step++) {
          const point = torusPoint(theta, (step / 40) * TAU);
          stroke(previous, point, 1, 0.24, 0.5, 0.32, 0.56);
          previous = point;
        }
      }

      /* Rings: two dotted orbital paths, dissolving at the far side. */
      const rings = [
        { radius: 1.26, rx: 1.22, rz: 0.32, phase: 0.4, period: 0.62 },
        { radius: 1.44, rx: 0.42, rz: 0.5, phase: -0.9, period: -0.42 },
      ];

      for (const orbit of rings) {
        const steps = 180;
        for (let i = 0; i < steps; i++) {
          const theta = (i / steps) * TAU;
          const baseX = Math.cos(theta) * orbit.radius;
          const baseY = Math.sin(theta) * orbit.radius;
          const baseZ = Math.sin(theta * 2 + orbit.phase) * 0.13;

          const point = project(
            baseX,
            baseY,
            baseZ,
            orbit.rx + pointerY * 0.05,
            spinY * orbit.period,
            orbit.rz + orbit.phase * 0.12,
          );

          const weight = 0.18 + point.depth * 0.4;
          const glyph = i % 6 === 0 ? 2 : 0;
          deposit(point.x, point.y, weight, 0.55 + point.depth * 0.4, glyph);
        }
      }

      /* Paint occupied cells in one pass. */
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col;
          const weight = intensity[index];
          if (weight <= 0.02) continue;

          const color = mix(neutral, accent, accentMix[index]);
          const alpha = 0.28 + weight * 0.7;
          ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
          ctx.fillText(
            GLYPHS[glyphIndex[index]] ?? GLYPHS[0],
            Math.round((col + 0.5) * cellW * 2) / 2,
            Math.round((row + 0.5) * cellH * 2) / 2,
          );
        }
      }
    }

    function frame(now: number) {
      if (!running) return;

      if (!lastFrame) lastFrame = now;
      const elapsed = now - lastFrame;

      if (elapsed >= FRAME_MS) {
        lastFrame = now;
        time += elapsed / 1000;

        const ease = interactive() ? 0.07 : 0;
        pointerX += (targetPointerX - pointerX) * ease;
        pointerY += (targetPointerY - pointerY) * ease;

        drawFrame();
      }

      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || !interactive() || !visible || document.hidden) return;
      running = true;
      lastFrame = 0;
      rafId = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetPointerX = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      targetPointerY = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      start();
    }

    function onPointerLeave() {
      targetPointerX = 0;
      targetPointerY = 0;
      start();
    }

    function onThemeChange() {
      readTokens();
      drawFrame();
    }

    function onMotionChange() {
      stop();
      pointerX = 0;
      pointerY = 0;
      targetPointerX = 0;
      targetPointerY = 0;
      drawFrame();
      start();
    }

    function onVisibility() {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(host);

    const intersection = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    intersection.observe(host);

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    readTokens();
    resize();

    if (interactive()) {
      host.addEventListener("pointermove", onPointerMove, { passive: true });
      host.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
      start();
    }

    motionQuery.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibility);

    const fontsReady = document.fonts?.ready;
    fontsReady
      ?.then(() => {
        if (!disposed) drawFrame();
      })
      .catch(() => {});

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className={className}>
      <canvas ref={canvasRef} className="pointer-events-none block h-full w-full" />
    </div>
  );
}
