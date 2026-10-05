import * as React from 'react'
import { cn } from './index'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost'
}

/** Tombol dasar sesuai token desain Semesta. */
export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'min-h-11 rounded-xl px-4 py-2 text-base font-semibold transition-colors',
        variant === 'primary' && 'bg-semesta-deep text-white active:bg-semesta-deep-dark',
        variant === 'ghost' && 'bg-transparent text-semesta-deep active:bg-semesta-baby/20',
      )}
    >
      {children}
    </button>
  )
}
