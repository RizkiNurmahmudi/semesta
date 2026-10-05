import React, { useEffect, useRef } from 'react';

/**
 * AnimatedSplashBackground — latar animasi ringan untuk splash screen.
 *
 * Awan melayang, orb baby-blue mengapung, bintang berkelip, dan dua cincin
 * orbit yang berputar pelan (menggemakan logo atom). Dibuat dengan canvas
 * agar tetap ringan di HP kelas menengah dan 100% offline (tanpa video).
 *
 * - Menghormati `prefers-reduced-motion` (hanya render satu frame statis).
 * - Animasi berhenti saat tab tidak terlihat (hemat baterai).
 */
interface Orb {
  x: number; y: number; r: number;
  vy: number; swayAmp: number; swayFreq: number; phase: number;
  color: string; alpha: number;
}
interface Cloud { x: number; y: number; w: number; speed: number; alpha: number; }
interface Sparkle { x: number; y: number; r: number; phase: number; speed: number; color: string; }

const AnimatedSplashBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const orbColors = ['#89CFF0', '#89CFF0', '#FFFFFF', '#FFC53D'];

    const orbs: Orb[] = Array.from({ length: 24 }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(6, 24),
      vy: rand(0.0001, 0.0004),
      swayAmp: rand(8, 28),
      swayFreq: rand(0.0004, 0.0012),
      phase: rand(0, Math.PI * 2),
      color: orbColors[Math.floor(Math.random() * orbColors.length)],
      alpha: rand(0.1, 0.28),
    }));

    const clouds: Cloud[] = Array.from({ length: 5 }, (_, i) => ({
      x: rand(0, 1),
      y: rand(0.03, 0.22) + (i % 2) * 0.1,
      w: rand(70, 130),
      speed: rand(0.00002, 0.00006),
      alpha: rand(0.35, 0.6),
    }));

    const sparkles: Sparkle[] = Array.from({ length: 22 }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(1.5, 3.5),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.001, 0.003),
      color: Math.random() < 0.35 ? '#FFC53D' : '#FFFFFF',
    }));

    const drawCloud = (cx: number, cy: number, s: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(cx, cy, s, s * 0.42, 0, 0, Math.PI * 2);
      ctx.ellipse(cx - s * 0.55, cy + s * 0.1, s * 0.62, s * 0.3, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + s * 0.55, cy + s * 0.08, s * 0.66, s * 0.32, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const t0 = performance.now();

    const draw = (now: number) => {
      const t = now - t0;
      ctx.clearRect(0, 0, w, h);

      // Cincin orbit raksasa yang berputar pelan (gema logo atom)
      const cx = w / 2;
      const cy = h * 0.4;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((t * 0.00005) % (Math.PI * 2));
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(w, h) * 0.42, Math.min(w, h) * 0.17, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((-t * 0.00004) % (Math.PI * 2));
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = '#1E6FB8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(w, h) * 0.34, Math.min(w, h) * 0.14, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Awan melayang
      for (const c of clouds) {
        const px = ((((c.x + t * c.speed) % 1.3) + 1.3) % 1.3 - 0.15) * w;
        drawCloud(px, c.y * h, c.w / 2, c.alpha);
      }

      // Orb mengapung naik perlahan + bergoyang
      for (const o of orbs) {
        const oy = ((((o.y - t * o.vy) % 1) + 1) % 1) * h;
        const ox = (o.x + (Math.sin(t * o.swayFreq + o.phase) * o.swayAmp) / Math.max(w, 1)) * w;
        ctx.globalAlpha = o.alpha;
        ctx.fillStyle = o.color;
        ctx.beginPath();
        ctx.arc(ox, oy, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bintang berkelip
      for (const s of sparkles) {
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = tw * 0.85;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      draw(t0 + 6000); // satu frame statis yang tetap cantik
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default AnimatedSplashBackground;
