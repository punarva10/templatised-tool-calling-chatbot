'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { functionRegistry } from '../lib/functionRegistry'

const FunctionRegistryContext = createContext<typeof functionRegistry | null>(null)

export function FunctionRegistryProvider({ children }: { children: ReactNode }) {
  return (
    <FunctionRegistryContext.Provider value={functionRegistry}>
      {children}
    </FunctionRegistryContext.Provider>
  )
}

export function useFunctionRegistry() {
  const context = useContext(FunctionRegistryContext)
  if (!context) {
    throw new Error('useFunctionRegistry must be used within a FunctionRegistryProvider')
  }
  return context
}