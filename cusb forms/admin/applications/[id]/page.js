// app/admin/applications/[id]/page.js
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabaseClient'

export default function ApplicationDetail({ params }) {
  const { id } = params
  const router = useRouter()
  const [application, setApplication] = useState(null)
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplication()
  }, [id])

  const fetchApplication = async () => {
    try {
      setLoading(true)
      
      // Fetch application details
      const { data: appData, error: appError } = await supabase
        .from('applications')
        .select(`
          *,
          form:application_forms(title),
          user:profiles(full_name, email, student_id)
        `)
        .eq('id', id)
        .single()

      if (appError) throw appError

      // Fetch responses
      const { data: resData, error: resError } = await supabase
        .from('application_responses')
        .select(`
          *,
          question:form_questions(question_text, question_type)
        `)
        .eq('application_id', id)

      if (resError) throw resError

      setApplication(appData)
      setResponses(resData)
    } catch (error) {
      console.error('Error fetching application:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (status) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      setApplication({...application, status})
    } catch (error) {
      console.error('Error updating status:', error.message)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!application) return <div>Application not found</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Application: {application.user?.full_name}
        </h1>
        <button 
          onClick={() => router.push('/admin/applications')} 
          className="btn btn-outline"
        >
          Back to Applications
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-white p-4 shadow">
          <h3 className="font-bold mb-2">Applicant Information</h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> {application.user?.full_name}</p>
            <p><strong>Email:</strong> {application.user?.email}</p>
            <p><strong>Student ID:</strong> {application.user?.student_id || 'N/A'}</p>
          </div>
        </div>

        <div className="card bg-white p-4 shadow">
          <h3 className="font-bold mb-2">Application Details</h3>
          <div className="space-y-2">
            <p><strong>Form:</strong> {application.form?.title}</p>
            <p><strong>Submitted:</strong> {new Date(application.submitted_at).toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <strong>Status:</strong>
              <select
                className="select select-bordered select-sm"
                value={application.status}
                onChange={(e) => updateStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-white p-4 shadow">
        <h3 className="font-bold mb-4">Responses</h3>
        <div className="space-y-4">
          {responses.map(response => (
            <div key={response.id} className="border-b pb-4 last:border-0">
              <h4 className="font-medium">{response.question?.question_text}</h4>
              <div className="mt-2">
                {response.question?.question_type === 'file' ? (
                  <a 
                    href={response.response_file_path} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    Download File
                  </a>
                ) : (
                  <p>{response.response_value || 'No response'}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}