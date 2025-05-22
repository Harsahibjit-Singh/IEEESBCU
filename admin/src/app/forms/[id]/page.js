// File: app/forms/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function FormDetailPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`/api/forms/${id}`);
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error('Error fetching form:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!form) return <div className="p-4 text-red-500">Form not found.</div>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <p className="text-gray-600 mb-6">Created at: {new Date(form.created_at).toLocaleString()}</p>

      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      <ul className="list-disc list-inside">
        {form.questions?.map((q, idx) => (
          <li key={idx} className="mb-1">{q}</li>
        ))}
      </ul>
    </main>
  );
}
