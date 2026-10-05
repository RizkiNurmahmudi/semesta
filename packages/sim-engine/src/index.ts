/**
 * @semesta/sim-engine — engine numerik deterministik untuk simulasi.
 *
 * Aturan keras (lihat PRD 10.4 & 10.5):
 * - TIDAK BOLEH bergantung pada React atau DOM.
 * - `step()` harus fungsi murni & deterministik (mudah diuji).
 * - Semua besaran memakai SI; satuan selalu ditampilkan di lapisan UI.
 */

/** Spesifikasi satu parameter simulasi (slider/toggle di UI). */
export interface ParamSpec {
  key: string
  label: string
  min: number
  max: number
  step: number
  unit: string
  default: number
}

export interface Challenge<S> {
  id: string
  title: string
  target: string
  check: (s: S) => boolean
}

/** Kontrak setiap simulasi — lihat PRD 10.5. */
export interface Simulation<P, S> {
  id: string
  learningGoal: string
  params: ParamSpec[]
  /** Keadaan awal dari parameter. */
  init: (p: P) => S
  /** Maju sebesar dt TETAP (detik). Fungsi murni: tanpa random tanpa seed. */
  step: (s: S, dt: number, p: P) => S
  /** Metrik untuk HUD & grafik. */
  metrics: (s: S, p: P) => Record<string, number>
  challenges?: Challenge<S>[]
}

/**
 * Satu langkah Runge–Kutta orde 4 untuk sistem ds/dt = deriv(s).
 * State direpresentasikan sebagai record numerik datar.
 */
export function rk4Step<S extends Record<string, number>>(
  s: S,
  dt: number,
  deriv: (s: S) => S,
): S {
  const keys = Object.keys(s) as (keyof S)[]
  const add = (a: S, b: S, k: number): S => {
    const out = {} as S
    for (const key of keys)
      out[key] = ((a[key] as number) + k * (b[key] as number)) as S[keyof S]
    return out
  }
  const k1 = deriv(s)
  const k2 = deriv(add(s, k1, dt / 2))
  const k3 = deriv(add(s, k2, dt / 2))
  const k4 = deriv(add(s, k3, dt))
  const out = {} as S
  for (const key of keys) {
    out[key] = (
      (s[key] as number) +
      (dt / 6) *
        ((k1[key] as number) + 2 * (k2[key] as number) + 2 * (k3[key] as number) + (k4[key] as number))
    ) as S[keyof S]
  }
  return out
}

/**
 * Akumulator fixed-timestep: panggil `update(frameDt)` tiap requestAnimationFrame.
 * Menjamin simulasi maju dengan dt tetap walau frame rate berfluktuasi.
 */
export function createStepper(dt: number) {
  let acc = 0
  return {
    update(frameDt: number, advance: () => void) {
      acc += Math.min(frameDt, 0.25) // clamp: tab yang lama di-background tidak "mengejar" berlebihan
      while (acc >= dt) {
        advance()
        acc -= dt
      }
    },
    reset() {
      acc = 0
    },
  }
}

// Simulasi Gerak Parabola (M1) — didefinisikan di projectile.ts.
export {
  GRAVITY,
  TARGET_DISTANCE,
  analyticRange,
  analyticMaxHeight,
  analyticFlightTime,
  projectileSim,
  simulateFlight,
} from './projectile'
export type { ProjectileParams, ProjectileState } from './projectile'
