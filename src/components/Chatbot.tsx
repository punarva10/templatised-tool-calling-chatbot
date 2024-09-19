/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import DynamicComponent from './DynamicComponent'

export default function Chatbot() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [loading, setLoading] = useState(false)
  const [currentUI, setCurrentUI] = useState<{ component: string; props: any } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])

    try {
      const response = await fetch('/api/executeFunction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const result = await response.json()

      setMessages(prev => [...prev, { role: 'assistant', content: result.message }])
      if (result.ui) {
        setCurrentUI({ component: result.ui, props: result.props })
      } else {
        setCurrentUI(null)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, an error occurred.' }])
    } finally {
      setLoading(false)
      setInput('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-100 p-4 h-96 overflow-y-auto mb-4 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-center">Loading...</div>}
      </div>
      {currentUI && <DynamicComponent name={currentUI.component} props={currentUI.props} />}
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border p-2 mr-2 rounded"
          placeholder="Enter your message"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  )
}