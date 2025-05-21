'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient'; // Make sure this is correctly set up

export default function NewQuestionPage() {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('text');
  const [options, setOptions] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      question_text: questionText,
      question_type: questionType,
      is_required: isRequired,
      options: questionType === 'dropdown' || questionType === 'radio' || questionType === 'checkbox' 
    ? JSON.parse(options || '[]') 
    : null,
    };

    const { data, error } = await supabase
      .from('form_questions')
      .insert(payload)
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Question created successfully!');
      router.push('/admin/questions');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create New Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">Question Text</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>

        <div>
            <select
            className="w-full border rounded px-3 py-2"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            >
            <option value="short_text">Short Text</option>
            <option value="long_text">Long Text</option>
            <option value="radio">Radio Buttons</option>
            <option value="checkbox">Checkboxes</option>
            <option value="dropdown">Dropdown</option>
            <option value="file">File Upload</option>
            <option value="date">Date</option>
            </select>

        </div>

        {((questionType === 'radio') || (questionType === 'checkbox') || (questionType === 'dropdown')) && (
          <div>
            <label className="block font-medium">
              Options (as JSON array: e.g. ["Option 1", "Option 2"])
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              rows={3}
              required
            />
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
          />
          <label className="font-medium">Is Required?</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Creating...' : 'Create Question'}
        </button>
      </form>
    </div>
  );
}
