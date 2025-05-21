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

  if (loading) return (
    <div className="p-4 rounded-lg mb-4 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300">
      Loading {fieldName}...
    </div>
  );

  return (
    <div className="p-4 rounded-lg shadow-lg mb-4 bg-gradient-to-br from-gray-800 via-gray-700 to-blue-900">
      <h3 className="text-lg font-semibold mb-2 capitalize text-white">
        {fieldName}
      </h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 rounded mb-3 bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        rows={4}
        placeholder={`Enter ${fieldName} content...`}
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 rounded bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Save Changes
      </button>
      {status && (
        <p className={`mt-2 text-sm ${
          status.includes('Failed') || status.includes('Error') 
            ? 'text-red-400' 
            : 'text-blue-300'
        }`}>
          {status}
        </p>
      )}
    </div>
  );
}