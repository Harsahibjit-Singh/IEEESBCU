'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const validQuestionTypes = [
  'short_text',
  'long_text',
  'radio',
  'checkbox',
  'dropdown',
  'file',
  'date',
];

export default function EditQuestionPage() {
  const router = useRouter();
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [text, setText] = useState('');
  const [type, setType] = useState('');
  const [options, setOptions] = useState('');

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await fetch(`/api/forms/questions/${id}`);
        const data = await res.json();
        if (res.ok) {
          setQuestion(data);
          setText(data.question_text);
          setType(data.question_type);
          setOptions(data.options ? JSON.stringify(data.options) : '');
        } else {
          setError(data.error || 'Failed to load question');
        }
      } catch (error) {
        setError('Something went wrong while fetching.');
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const updatedData = {
        question_text: text,
        question_type: type,
        options:
          ['radio', 'checkbox', 'dropdown'].includes(type) && options
            ? JSON.parse(options)
            : null,
      };

      const res = await fetch(`/api/forms/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Question updated successfully.');
      } else {
        setError(data.error || 'Failed to update question.');
      }
    } catch (err) {
      setError('Invalid data or server error.');
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this question?')) return;

    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/forms/questions/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Question deleted.');
        setTimeout(() => {
          router.push('/admin/questions');
        }, 1500);
      } else {
        setError(data.error || 'Failed to delete question.');
      }
    } catch (err) {
      setError('Something went wrong while deleting.');
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!question) return <p>Question not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Edit Question</h1>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Question Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Question Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select type</option>
            {validQuestionTypes.map((qt) => (
              <option key={qt} value={qt}>
                {qt.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {['radio', 'checkbox', 'dropdown'].includes(type) && (
          <div>
            <label className="block font-medium">Options (JSON Array)</label>
            <textarea
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={3}
              placeholder='e.g. ["Option 1", "Option 2"]'
              required
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
