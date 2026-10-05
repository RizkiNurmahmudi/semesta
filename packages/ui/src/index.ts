import * as React from 'react'
import { Button } from './Button'

export { Button }

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export { React }
