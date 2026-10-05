/**
 * @semesta/sim-engine — simulasi Gerak Parabola (M1 vertical slice).
 * Memenuhi kontrak `Simulation` dari ./index: murni, deterministik, SI.
 */
import { rk4Step, type Simulation } from './index'

/** Gravitasi bumi (m/s²) — konstanta untuk seluruh simulasi M1. */
export const GRAVITY = 9.8

export interface ProjectileParams {
  /** Sudut elevasi (derajat). */
  angleDeg: number
  /** Kecepatan awal (m/s). */
  velocity: number
}

export interface ProjectileState {
  x: number
  y: number
  vx: number
  vy: number
  /** Waktu simulasi berjalan (detik). */
  t: number
}

const rad = (deg: number) => (deg * Math.PI) / 180

/** Solusi analitik — dipakai HUD & validasi numerik. */
export const analyticRange = (v: number, angleDeg: number) =>
  (v * v * Math.sin(2 * rad(angleDeg))) / GRAVITY

export const analyticMaxHeight = (v: number, angleDeg: number) => {
  const s = Math.sin(rad(angleDeg))
  return (v * v * s * s) / (2 * GRAVITY)
}

export const analyticFlightTime = (v: number, angleDeg: number) =>
  (2 * v * Math.sin(rad(angleDeg))) / GRAVITY

/** Target latihan membidik (meter) — sama dengan target di layar desain. */
export const TARGET_DISTANCE = 40.816

export const projectileSim: Simulation<ProjectileParams, ProjectileState> = {
  id: 'sim-gerak-parabola',
  learningGoal:
    'Memahami bahwa sudut elevasi 45° memberi jangkauan terjauh dan lintasan berbentuk parabola.',
  params: [
    { key: 'angleDeg', label: 'Sudut', min: 15, max: 80, step: 1, unit: '°', default: 45 },
    { key: 'velocity', label: 'Kecepatan', min: 10, max: 30, step: 1, unit: 'm/s', default: 20 },
  ],
  init: (p) => {
    const r = rad(p.angleDeg)
    return { x: 0, y: 0, vx: p.velocity * Math.cos(r), vy: p.velocity * Math.sin(r), t: 0 }
  },
  step: (s, dt) => {
    // Sudah mendarat → diam (fungsi tetap murni).
    if (s.t > 0 && s.y <= 0 && s.vy <= 0) return s
    const next = rk4Step<Record<string, number>>({ ...s }, dt, (st) => ({
      x: st.vx,
      y: st.vy,
      vx: 0,
      vy: -GRAVITY,
      t: 1,
    }))
    const out: ProjectileState = {
      x: next.x,
      y: next.y,
      vx: next.vx,
      vy: next.vy,
      t: next.t,
    }
    // Jepit ke tanah saat menembus permukaan.
    if (out.y < 0) return { ...out, y: 0, vx: 0, vy: 0 }
    return out
  },
  metrics: (s, p) => ({
    range: analyticRange(p.velocity, p.angleDeg),
    maxHeight: analyticMaxHeight(p.velocity, p.angleDeg),
    flightTime: analyticFlightTime(p.velocity, p.angleDeg),
    x: s.x,
    y: s.y,
    t: s.t,
  }),
  challenges: [
    {
      id: 'bidik-target',
      title: 'Bidik target 40,8 m',
      target: 'Mendarat dalam ±0,5 m dari bendera target',
      check: (s) =>
        s.t > 0 && s.y === 0 && s.vy === 0 && Math.abs(s.x - TARGET_DISTANCE) <= 0.5,
    },
  ],
}

/** Jalankan penerbangan penuh hingga mendarat (helper untuk tes & pratinjau). */
export function simulateFlight(
  p: ProjectileParams,
  dt = 1 / 240,
): ProjectileState {
  let s = projectileSim.init(p)
  const maxSteps = Math.ceil(30 / dt)
  for (let i = 0; i < maxSteps; i++) {
    const next = projectileSim.step(s, dt, p)
    s = next
    if (s.t > 0 && s.y === 0 && s.vy === 0) break
  }
  return s
}
