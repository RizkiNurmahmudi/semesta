// @vitest-environment jsdom
import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './index'

describe('Button', () => {
  it('menampilkan children dan memanggil onClick', () => {
    const onClick = vi.fn()
    render(React.createElement(Button, { onClick }, 'Mulai'))
    fireEvent.click(screen.getByText('Mulai'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
