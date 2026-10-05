"use client";

import { useEffect, useRef } from "react";

/*
 * Decorative, pointer-reactive dot grid rendered on a single background canvas.
 * It is purely visual: positioned behind all content, ignores pointer events,
 * and reuses the existing palette tokens (--ink for resting dots, --accent for
 * the plum "ink" that appears near the cursor). It never participates in layout.
 *
 * On coarse pointers (touch) and when reduced motion is requested it falls back
 * to a static, extremely subtle grid with no animation.
 */

type RGB = [number, number, number];

const REST_ALPHA = 0.1;
const PEAK_ALPHA = 0.62;
const REST_RADIUS = 1;
const PEAK_RADIUS = 2.4;
const LERP_IN = 0.14;
const LERP_OUT = 0.1;

function parseColor(value: string, fallback: RGB): RGB {
  const v = value.trim();
  if (v.startsWith("#")) {
    let hex = v.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
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
    if (parts.length >= 3) {
      return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
    }
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

function spacingFor(width: number) {
  if (width < 640) return 28;
  if (width < 1024) return 34;
  return 40;
}

export function CursorDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return;
    const context2d = canvasNode.getContext("2d", { alpha: true });
    if (!context2d) return;
    const canvas: HTMLCanvasElement = canvasNode;
    const ctx: CanvasRenderingContext2D = context2d;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const staticLayer = document.createElement("canvas");
    const staticCtx = staticLayer.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let spacing = 40;
    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    let influence = new Float32Array(0);
    let neutral: RGB = [28, 26, 25];
    let plum: RGB = [139, 83, 111];

    const active = new Set<number>();
    const pointer = { x: -10000, y: -10000, active: false };

    let rafId = 0;
    let running = false;
    let globalAlpha = 1;

    /* Interaction is disabled for reduced motion; touch pointers are ignored
       per-event so touch devices keep a static grid. */
    const interactive = () => !reducedQuery.matches;

    function readTokens() {
      const cs = getComputedStyle(document.documentElement);
      neutral = parseColor(cs.getPropertyValue("--ink"), neutral);
      plum = parseColor(cs.getPropertyValue("--accent"), plum);
    }

    function buildStatic() {
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      offX = (width - (cols - 1) * spacing) / 2;
      offY = (height - (rows - 1) * spacing) / 2;
      influence = new Float32Array(cols * rows);
      active.clear();

      staticLayer.width = Math.max(1, Math.round(width * dpr));
      staticLayer.height = Math.max(1, Math.round(height * dpr));
      if (!staticCtx) return;
      staticCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      staticCtx.clearRect(0, 0, width, height);
      staticCtx.fillStyle = `rgba(${neutral[0]},${neutral[1]},${neutral[2]},${REST_ALPHA})`;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          staticCtx.beginPath();
          staticCtx.arc(offX + c * spacing, offY + r * spacing, REST_RADIUS, 0, Math.PI * 2);
          staticCtx.fill();
        }
      }
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = globalAlpha;
      ctx.drawImage(staticLayer, 0, 0, width, height);

      for (const idx of active) {
        const a = influence[idx];
        if (a <= 0.001) continue;
        const c = idx % cols;
        const r = (idx - c) / cols;
        const x = offX + c * spacing;
        const y = offY + r * spacing;
        const alpha = REST_ALPHA + (PEAK_ALPHA - REST_ALPHA) * a;
        const radius = REST_RADIUS + (PEAK_RADIUS - REST_RADIUS) * a;
        const col = mix(neutral, plum, Math.min(1, a * 1.15));
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function falloff(distance: number, radius: number) {
      if (distance >= radius) return 0;
      const t = 1 - distance / radius;
      return t * t * (3 - 2 * t);
    }

    function step() {
      const radius = Math.max(90, spacing * 3.4);

      for (const idx of active) {
        influence[idx] += (0 - influence[idx]) * LERP_OUT;
      }

      if (pointer.active && interactive()) {
        const minC = Math.max(0, Math.floor((pointer.x - radius - offX) / spacing));
        const maxC = Math.min(cols - 1, Math.ceil((pointer.x + radius - offX) / spacing));
        const minR = Math.max(0, Math.floor((pointer.y - radius - offY) / spacing));
        const maxR = Math.min(rows - 1, Math.ceil((pointer.y + radius - offY) / spacing));

        for (let r = minR; r <= maxR; r++) {
          for (let c = minC; c <= maxC; c++) {
            const x = offX + c * spacing;
            const y = offY + r * spacing;
            const target = falloff(Math.hypot(pointer.x - x, pointer.y - y), radius);
            if (target <= 0) continue;
            const idx = r * cols + c;
            influence[idx] += (target - influence[idx]) * LERP_IN;
            active.add(idx);
          }
        }
      }

      for (const idx of active) {
        if (influence[idx] < 0.002) {
          influence[idx] = 0;
          active.delete(idx);
        }
      }

      const targetGlobal = Math.max(
        0.62,
        1 - ((window.scrollY || 0) / (height * 1.6)) * 0.38,
      );
      globalAlpha += (targetGlobal - globalAlpha) * 0.12;

      render();

      if (active.size > 0 || pointer.active || Math.abs(globalAlpha - targetGlobal) > 0.003) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
      }
    }

    function start() {
      if (running || !interactive()) return;
      running = true;
      rafId = requestAnimationFrame(step);
    }

    function resize() {
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      spacing = spacingFor(width);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readTokens();
      globalAlpha = 1;
      buildStatic();
      render();

      if (interactive()) start();
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") {
        if (pointer.active) onPointerLeave();
        return;
      }
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      start();
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.x = -10000;
      pointer.y = -10000;
      start();
    }

    function onScroll() {
      start();
    }

    function onThemeChange() {
      readTokens();
      buildStatic();
      render();
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", resize);

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    resize();

    if (interactive()) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const onMotionChange = () => {
      resize();
      if (!interactive()) {
        cancelAnimationFrame(rafId);
        running = false;
        pointer.active = false;
        active.clear();
        render();
      }
    };
    reducedQuery.addEventListener("change", onMotionChange);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        running = false;
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 select-none"
      style={{ zIndex: -1 }}
    />
  );
}
