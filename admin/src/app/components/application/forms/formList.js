// File: app/components/forms/FormList.js
'use client';

import { useEffect, useState } from 'react';

export default function FormList({ onSelectForm }) {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch('/api/forms')
      .then(res => res.json())
      .then(data => setForms(data))
      .catch(err => console.error('Failed to fetch forms:', err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Available Forms</h2>
      <ul>
        {forms.map(form => (
          <li
            key={form.id}
            onClick={() => onSelectForm(form.id)}
            className="cursor-pointer underline hover:text-blue-600"
          >
            {form.title}
          </li>
        ))}
      </ul>
    </div>
  );
}