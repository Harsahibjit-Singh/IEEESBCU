'use client';

import { useState } from 'react';

export default function FormBuilder({ user, onFormCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSection = () => {
    setSections(prev => [...prev, {
      title: '',
      order: prev.length + 1,
      questions: []
    }]);
  };

  const handleAddQuestion = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].questions.push({
      question: '',
      type: 'text',
      options: [],
      required: false
    });
    setSections(updated);
  };

  const handleCreateForm = async () => {
    setIsSubmitting(true);

    // Create form
    const res = await fetch('/api/forms/create', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        created_by: user.name // Auth0 ID
      })
    });

    const form = await res.json();
    if (form.error) {
      alert(form.error);
      setIsSubmitting(false);
      return;
    }

    // Create sections and questions
    for (const section of sections) {
      const sectionRes = await fetch(`/api/forms/${form.id}/sections`, {
        method: 'POST',
        body: JSON.stringify({
          title: section.title,
          order: section.order
        })
      });

      const newSection = await sectionRes.json();
      if (newSection.error) continue;

      for (const q of section.questions) {
        await fetch(`/api/sections/${newSection.id}/questions`, {
          method: 'POST',
          body: JSON.stringify(q)
        });
      }
    }

    setIsSubmitting(false);
    onFormCreated(form); // Notify parent
    setTitle('');
    setDescription('');
    setSections([]);
    alert('Form created successfully!');
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Create New Application Form</h2>

      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Form Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6 border p-3 rounded bg-gray-50">
          <input
            type="text"
            placeholder={`Section ${sectionIndex + 1} Title`}
            value={section.title}
            onChange={(e) => {
              const updated = [...sections];
              updated[sectionIndex].title = e.target.value;
              setSections(updated);
            }}
            className="w-full mb-2 p-2 border rounded"
          />
          {section.questions.map((q, qIndex) => (
            <div key={qIndex} className="border p-2 mb-2 bg-white rounded">
              <input
                type="text"
                placeholder="Question text"
                value={q.question}
                onChange={(e) => {
                  const updated = [...sections];
                  updated[sectionIndex].questions[qIndex].question = e.target.value;
                  setSections(updated);
                }}
                className="w-full mb-1 p-2 border rounded"
              />

              <select
                value={q.type}
                onChange={(e) => {
                  const updated = [...sections];
                  updated[sectionIndex].questions[qIndex].type = e.target.value;
                  setSections(updated);
                }}
                className="w-full mb-1 p-2 border rounded"
              >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="select">Select</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
              </select>

              {(q.type === 'select' || q.type === 'checkbox' || q.type === 'radio') && (
                <textarea
                  placeholder="Comma-separated options"
                  value={q.options.join(',')}
                  onChange={(e) => {
                    const updated = [...sections];
                    updated[sectionIndex].questions[qIndex].options = e.target.value.split(',').map(o => o.trim());
                    setSections(updated);
                  }}
                  className="w-full p-2 border rounded"
                />
              )}

              <label className="flex items-center mt-1">
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={(e) => {
                    const updated = [...sections];
                    updated[sectionIndex].questions[qIndex].required = e.target.checked;
                    setSections(updated);
                  }}
                  className="mr-2"
                />
                Required
              </label>
            </div>
          ))}
          <button
            onClick={() => handleAddQuestion(sectionIndex)}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Question
          </button>
        </div>
      ))}

      <button
        onClick={handleAddSection}
        className="text-blue-600 hover:underline mb-4"
      >
        + Add Section
      </button>

      <button
        onClick={handleCreateForm}
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? 'Creating...' : 'Create Form'}
      </button>
    </div>
  );
}
