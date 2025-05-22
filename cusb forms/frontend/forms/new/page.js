'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateFormPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('general')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const newForm = {
      title,
      description,
      type,
      is_active: true,
    }

    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newForm),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create form')

      router.push('/forms') // redirect to forms list
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Form</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Type</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="general">General</option>
            <option value="job">Job Application</option>
            <option value="event">Event Registration</option>
            {/* Add more types based on your use case */}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Form'}
        </button>
      </form>
    </div>
  )
}
