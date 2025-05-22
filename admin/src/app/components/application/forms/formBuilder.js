// File: app/components/forms/FormBuilder.js
'use client';

import { useState } from 'react';

export default function FormBuilder({ user }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState(['']);

  const handleSubmit = async () => {
    const form = { title, questions, userId: user.sub };
    const res = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert('Form created: ' + data.id);
    setTitle('');
    setQuestions(['']);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create a New Form</h2>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((q, i) => (
        <input
          key={i}
          className="border p-2 mb-2 w-full"
          placeholder={`Question ${i + 1}`}
          value={q}
          onChange={(e) => {
            const newQs = [...questions];
            newQs[i] = e.target.value;
            setQuestions(newQs);
          }}
        />
      ))}
      <button onClick={() => setQuestions([...questions, ''])}>Add Question</button>
      <button onClick={handleSubmit} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
}