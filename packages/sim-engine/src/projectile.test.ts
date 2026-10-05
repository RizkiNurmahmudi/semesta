import { describe, expect, it } from 'vitest'
import {
  analyticFlightTime,
  analyticMaxHeight,
  analyticRange,
  projectileSim,
  simulateFlight,
  TARGET_DISTANCE,
} from './projectile'

describe('solusi analitik gerak parabola', () => {
  it('v=20 m/s, θ=45° → jangkauan 40,8 m (sesuai layar desain)', () => {
    expect(analyticRange(20, 45)).toBeCloseTo(40.8, 1)
  })

  it('v=20 m/s, θ=45° → tinggi maks ≈ 10,2 m', () => {
    expect(analyticMaxHeight(20, 45)).toBeCloseTo(10.2, 1)
  })

  it('v=20 m/s, θ=45° → waktu melayang ≈ 2,89 dtk', () => {
    expect(analyticFlightTime(20, 45)).toBeCloseTo(2.89, 2)
  })

  it('sudut 45° memberi jangkauan terjauh; 30° dan 60° simetris', () => {
    const r30 = analyticRange(20, 30)
    const r45 = analyticRange(20, 45)
    const r60 = analyticRange(20, 60)
    expect(r45).toBeGreaterThan(r30)
    expect(r45).toBeGreaterThan(r60)
    expect(r30).toBeCloseTo(r60, 9)
  })
})

describe('integrasi numerik (rk4, dt tetap)', () => {
  it('mendarat di tanah dengan x ≈ jangkauan analitik', () => {
    const s = simulateFlight({ angleDeg: 45, velocity: 20 })
    expect(s.y).toBe(0)
    expect(s.x).toBeCloseTo(analyticRange(20, 45), 1)
  })

  it('bola tidak pernah di bawah tanah selama penerbangan', () => {
    let s = projectileSim.init({ angleDeg: 60, velocity: 25 })
    for (let i = 0; i < 2000; i++) {
      s = projectileSim.step(s, 1 / 120, { angleDeg: 60, velocity: 25 })
      expect(s.y).toBeGreaterThanOrEqual(0)
      if (s.t > 0 && s.y === 0) break
    }
  })

  it('deterministik: dua penerbangan identik', () => {
    const a = simulateFlight({ angleDeg: 45, velocity: 20 })
    const b = simulateFlight({ angleDeg: 45, velocity: 20 })
    expect(a).toEqual(b)
  })
})

describe('tantangan membidik target', () => {
  const challenge = projectileSim.challenges![0]

  it('v=20, θ=45° mendarat dalam ±0,5 m dari target 40,8 m', () => {
    expect(TARGET_DISTANCE).toBeCloseTo(40.8, 1)
    const s = simulateFlight({ angleDeg: 45, velocity: 20 })
    expect(challenge.check(s)).toBe(true)
  })

  it('parameter lain tidak otomatis lolos', () => {
    const s = simulateFlight({ angleDeg: 30, velocity: 15 })
    expect(challenge.check(s)).toBe(false)
  })
})
