// app/admin/forms/page.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/app/lib/supabaseClient'

export default function FormsPage() {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('application_forms')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setForms(data)
    } catch (error) {
      console.error('Error fetching forms:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteForm = async (id) => {
    if (!confirm('Are you sure you want to delete this form?')) return
    try {
      const { error } = await supabase
        .from('application_forms')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchForms()
    } catch (error) {
      console.error('Error deleting form:', error.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forms Management</h1>
        <Link href="/forms/new" className="btn btn-primary">
          Create New Form
        </Link>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {forms.map(form => (
            <div key={form.id} className="card bg-white p-4 shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{form.title}</h3>
                  <p className="text-sm text-gray-600">{form.description}</p>
                </div>
                <div className="flex gap-2">
                  <Link 
                    href={`/forms/${form.id}`} 
                    className="btn btn-sm btn-outline"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => deleteForm(form.id)} 
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}