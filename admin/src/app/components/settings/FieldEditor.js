'use client';

import { useEffect, useState } from 'react';

export default function FieldEditor({ fieldName }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/settings/update-branch-field?field_name=${encodeURIComponent(fieldName)}`);
        const result = await res.json();
        if (res.ok) {
          setContent(result.data.field_content || '');
        } else {
          setStatus(result.error || 'Failed to fetch');
        }
      } catch (error) {
        setStatus('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fieldName]);

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      const res = await fetch('/api/settings/update-branch-field', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field_name: fieldName, field_content: content }),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus('Saved successfully');
      } else {
        setStatus(result.error || 'Failed to save');
      }
    } catch {
      setStatus('Error saving data');
    }
  };

  if (loading) return <div>Loading {fieldName}...</div>;

  return (
    <div className="p-4 border rounded-lg shadow mb-4 bg-white">
      <h3 className="text-lg font-semibold mb-2 capitalize">{fieldName}</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        rows={4}
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
}
