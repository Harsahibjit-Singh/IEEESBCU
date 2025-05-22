// app/admin/forms/[id]/page.js
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabaseClient'
import QuestionEditor from '@/app/components/QuestionEditor'

export default function FormEditor({ params }) {
  const { id } = params
  const router = useRouter()
  const [form, setForm] = useState(null)
  const [questions, setQuestions] = useState([])
  const [availableQuestions, setAvailableQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFormData()
    fetchAllQuestions()
  }, [id])

  const fetchFormData = async () => {
    try {
      setLoading(true)
      
      // Fetch form details
      const { data: formData, error: formError } = await supabase
        .from('application_forms')
        .select('*')
        .eq('id', id)
        .single()

      if (formError) throw formError

      // Fetch assigned questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('form_question_assignments')
        .select(`
          display_order,
          question:form_questions (
            id,
            question_text,
            question_type,
            options,
            is_required
          )
        `)
        .eq('form_id', id)
        .order('display_order', { ascending: true })

      if (questionsError) throw questionsError

      setForm(formData)
      setQuestions(questionsData)
    } catch (error) {
      console.error('Error fetching form data:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllQuestions = async () => {
    const { data, error } = await supabase
      .from('form_questions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setAvailableQuestions(data)
  }

  const updateForm = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('application_forms')
        .update({
          title: form.title,
          description: form.description,
          is_active: form.is_active
        })
        .eq('id', id)

      if (error) throw error
      alert('Form updated successfully!')
    } catch (error) {
      console.error('Error updating form:', error.message)
    }
  }

  const addQuestionToForm = async (questionId) => {
    try {
      const displayOrder = questions.length > 0 
        ? Math.max(...questions.map(q => q.display_order)) + 1 
        : 1

      const { error } = await supabase
        .from('form_question_assignments')
        .insert({
          form_id: id,
          question_id: questionId,
          display_order: displayOrder
        })

      if (error) throw error
      fetchFormData()
    } catch (error) {
      console.error('Error adding question:', error.message)
    }
  }

  const removeQuestionFromForm = async (assignmentId) => {
    try {
      const { error } = await supabase
        .from('form_question_assignments')
        .delete()
        .eq('id', assignmentId)

      if (error) throw error
      fetchFormData()
    } catch (error) {
      console.error('Error removing question:', error.message)
    }
  }

  const reorderQuestions = async (newOrder) => {
    try {
      const updates = newOrder.map((question, index) => ({
        id: question.id,
        display_order: index + 1
      }))

      const { error } = await supabase
        .from('form_question_assignments')
        .upsert(updates)

      if (error) throw error
      fetchFormData()
    } catch (error) {
      console.error('Error reordering questions:', error.message)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!form) return <div>Form not found</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Form: {form.title}</h1>
        <button 
          onClick={() => router.push('/forms')} 
          className="btn btn-outline"
        >
          Back to Forms
        </button>
      </div>

      <form onSubmit={updateForm} className="mb-8">
        <div className="grid gap-4 mb-4">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
            />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Active</span>
              <input
                type="checkbox"
                className="toggle"
                checked={form.is_active}
                onChange={(e) => setForm({...form, is_active: e.target.checked})}
              />
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save Form</button>
      </form>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Form Questions</h2>
        <QuestionEditor
          questions={questions}
          availableQuestions={availableQuestions}
          onAddQuestion={addQuestionToForm}
          onRemoveQuestion={removeQuestionFromForm}
          onReorderQuestions={reorderQuestions}
        />
      </div>
    </div>
  )
}