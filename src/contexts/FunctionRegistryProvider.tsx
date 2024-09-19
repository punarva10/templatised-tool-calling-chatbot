'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { FunctionDefinition, functionRegistry } from '../lib/functionRegistry'

type FunctionRegistryContextType = {
  registerFunction: (func: FunctionDefinition) => void;
  getFunction: (name: string) => FunctionDefinition | undefined;
  getAllFunctions: () => FunctionDefinition[];
}

const FunctionRegistryContext = createContext<FunctionRegistryContextType | null>(null)

export function FunctionRegistryProvider({ children }: { children: ReactNode }) {
  const value: FunctionRegistryContextType = {
    registerFunction: functionRegistry.registerFunction.bind(functionRegistry),
    getFunction: functionRegistry.getFunction.bind(functionRegistry),
    getAllFunctions: functionRegistry.getAllFunctions.bind(functionRegistry),
  }

  return (
    <FunctionRegistryContext.Provider value={value}>
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