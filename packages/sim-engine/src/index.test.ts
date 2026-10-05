import { describe, expect, it } from 'vitest'
import { createStepper, rk4Step } from './index'

describe('rk4Step', () => {
  it('cocok dengan solusi analitik peluruhan eksponensial (dy/dt = -y)', () => {
    let s = { y: 1 }
    const dt = 0.01
    for (let t = 0; t < 1; t += dt) {
      s = rk4Step(s, dt, (st) => ({ y: -st.y }))
    }
    expect(s.y).toBeCloseTo(Math.exp(-1), 6)
  })

  it('deterministik: dua run menghasilkan state identik', () => {
    const run = () => {
      let s = { y: 1 }
      for (let i = 0; i < 100; i++) s = rk4Step(s, 0.01, (st) => ({ y: -st.y }))
      return s.y
    }
    expect(run()).toBe(run())
  })
})

describe('createStepper', () => {
  it('maju dengan langkah tetap walau frame dt berbeda', () => {
    const stepper = createStepper(1 / 60)
    let n = 0
    stepper.update(1 / 30, () => n++)
    expect(n).toBe(2)
    stepper.update(1 / 120, () => n++)
    expect(n).toBe(2) // akumulasi 1/120 < 1/60 → belum maju
    stepper.update(1 / 120, () => n++)
    expect(n).toBe(3)
  })
})
