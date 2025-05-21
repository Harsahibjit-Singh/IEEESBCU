// app/admin/questions/page.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/app/lib/supabaseClient'

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('form_questions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setQuestions(data)
    } catch (error) {
      console.error('Error fetching questions:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteQuestion = async (id) => {
    if (!confirm('Are you sure you want to delete this question?')) return
    try {
      const { error } = await supabase
        .from('form_questions')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchQuestions()
    } catch (error) {
      console.error('Error deleting question:', error.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Questions Management</h1>
        <Link href="/admin/questions/new" className="btn btn-primary">
          Create New Question
        </Link>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Question</th>
                <th>Type</th>
                <th>Required</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(question => (
                <tr key={question.id}>
                  <td>{question.question_text}</td>
                  <td>{question.question_type}</td>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={question.is_required} 
                      className="checkbox" 
                      disabled 
                    />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link 
                        href={`/admin/questions/${question.id}`} 
                        className="btn btn-sm btn-outline"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => deleteQuestion(question.id)} 
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </div>
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