// app/admin/applications/page.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/app/lib/supabaseClient'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    formId: '',
    status: ''
  })

  useEffect(() => {
    fetchApplications()
  }, [filters])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('applications')
        .select(`
          *,
          form:application_forms(title),
          user:profiles(full_name, email)
        `)
        .order('submitted_at', { ascending: false })

      if (filters.formId) query = query.eq('form_id', filters.formId)
      if (filters.status) query = query.eq('status', filters.status)

      const { data, error } = await query

      if (error) throw error
      setApplications(data)
    } catch (error) {
      console.error('Error fetching applications:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      fetchApplications()
    } catch (error) {
      console.error('Error updating status:', error.message)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Applications</h1>

      <div className="card bg-white p-4 shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Filter by Form</label>
            <select
              className="select select-bordered w-full"
              value={filters.formId}
              onChange={(e) => setFilters({...filters, formId: e.target.value})}
            >
              <option value="">All Forms</option>
              {/* You would fetch forms for these options */}
            </select>
          </div>
          <div>
            <label className="block mb-2">Filter by Status</label>
            <select
              className="select select-bordered w-full"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => setFilters({ formId: '', status: '' })}
              className="btn btn-outline w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Form</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td>
                    <div className="font-medium">{app.user?.full_name}</div>
                    <div className="text-sm text-gray-500">{app.user?.email}</div>
                  </td>
                  <td>{app.form?.title}</td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>{new Date(app.submitted_at).toLocaleDateString()}</td>
                  <td>
                    <Link 
                      href={`/admin/applications/${app.id}`} 
                      className="btn btn-sm btn-outline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}