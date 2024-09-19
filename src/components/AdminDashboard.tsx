/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useFunctionRegistry } from '../contexts/FunctionRegistryProvider'

export default function AdminDashboard() {
  const { registerFunction, getAllFunctions } = useFunctionRegistry()
  const [newFunction, setNewFunction] = useState({ name: '', description: '', logic: '', parameters: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    registerFunction({
      ...newFunction,
      logic: new Function('args', newFunction.logic) as any
    })
    setNewFunction({ name: '', description: '', logic: '', parameters: "" })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newFunction.name}
          onChange={(e) => setNewFunction({ ...newFunction, name: e.target.value })}
          placeholder="Function Name"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newFunction.description}
          onChange={(e) => setNewFunction({ ...newFunction, description: e.target.value })}
          placeholder="Description"
          className="border p-2 mr-2"
        />
        <textarea
          value={newFunction.logic}
          onChange={(e) => setNewFunction({ ...newFunction, logic: e.target.value })}
          placeholder="Function Logic (as string)"
          className="border p-2 mr-2"
        />
        <textarea
          value={newFunction.parameters}
          onChange={(e) => setNewFunction({ ...newFunction, parameters: JSON.parse(e.target.value) })}
          placeholder="Function parameters (as json)"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Function</button>
      </form>
      <h2 className="text-xl font-bold mb-2">Registered Functions:</h2>
      <ul>
        {getAllFunctions().map(func => (
          <li key={func.name}>{func.name}: {func.description}</li>
        ))}
      </ul>
    </div>
  )
}