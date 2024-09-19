/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useFunctionRegistry } from '../contexts/FunctionRegistryProvider'
import { FunctionDefinition } from '../lib/functionRegistry'
import styles from './AdminDashboard.module.css'

export default function AdminDashboard() {
  const { registerFunction, getAllFunctions } = useFunctionRegistry()
  const [newFunction, setNewFunction] = useState<Omit<FunctionDefinition, 'logic' | 'parameters'> & { logic: string, parameters: string }>({
    name: '',
    description: '',
    parameters: '',
    logic: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const functionToRegister: FunctionDefinition = {
      ...newFunction,
      parameters: JSON.parse(newFunction.parameters),
      logic: new Function('args', `return (async () => { ${newFunction.logic} })()`) as any
    }
    registerFunction(functionToRegister)
    setNewFunction({ name: '', description: '', parameters: '', logic: '' })
  }

  const functions = getAllFunctions()

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={newFunction.name}
          onChange={(e) => setNewFunction({ ...newFunction, name: e.target.value })}
          placeholder="Function Name"
          className={styles.input}
        />
        <input
          type="text"
          value={newFunction.description}
          onChange={(e) => setNewFunction({ ...newFunction, description: e.target.value })}
          placeholder="Description"
          className={styles.input}
        />
        <textarea
          value={newFunction.parameters}
          onChange={(e) => setNewFunction({ ...newFunction, parameters: e.target.value })}
          placeholder="Function parameters (as json string)"
          className={styles.textarea}
        />
        <textarea
          value={newFunction.logic}
          onChange={(e) => setNewFunction({ ...newFunction, logic: e.target.value })}
          placeholder="Function Logic (as string)"
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>Add Function</button>
      </form>
      <h2 className={styles.title}>Registered Functions:</h2>
      <ul className={styles.list}>
        {functions.map(func => (
          <li key={func.name} className={styles.listItem}>
            <span className={styles.functionName}>{func.name}:</span> {' '}
            <span className={styles.functionDescription}>{func.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}