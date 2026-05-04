import { createContext } from 'react'

export const OutlineContext = createContext<{
  setOutlineHandler: (fn: (() => void) | null) => void
} | null>(null)
