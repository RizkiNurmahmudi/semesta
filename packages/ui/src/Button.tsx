import * as React from 'react'
import { cn } from './index'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost'
}

/** Tombol dasar sesuai token desain (mode UI diatur via tema, bukan komponen). */
export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'min-h-11 rounded-xl px-4 py-2 text-base font-semibold transition-colors',
        variant === 'primary' && 'bg-indigo-600 text-white active:bg-indigo-700',
        variant === 'ghost' && 'bg-transparent text-indigo-700 active:bg-indigo-50',
      )}
    >
      {children}
    </button>
  )
}
