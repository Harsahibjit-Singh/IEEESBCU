// File: app/components/forms/FormResponses.js
'use client';

import { useEffect, useState } from 'react';

export default function FormResponses({ formId }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (formId) {
      fetch(`/api/forms/${formId}/responses`)
        .then(res => res.json())
        .then(data => setResponses(data))
        .catch(err => console.error('Failed to fetch responses:', err));
    }
  }, [formId]);

  if (!formId) return <div>Please select a form to view responses.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Form Responses</h2>
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <ul>
          {responses.map((resp, i) => (
            <li key={i} className="border-b py-2">
              {resp.answers.map((a, j) => (
                <div key={j}>
                  <strong>Q{j + 1}:</strong> {a}
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
