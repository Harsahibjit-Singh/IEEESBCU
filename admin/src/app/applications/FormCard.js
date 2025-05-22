'use client';

import Link from 'next/link';

export default function FormCard({ form }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{form.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{form.description}</p>
      <p className="text-xs text-gray-500">Created: {new Date(form.created_at).toLocaleDateString()}</p>
      <div className="mt-2">
        <Link
          href={`/forms/${form.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Form
        </Link>
        <span className="mx-2">|</span>
        <Link
          href={`/admin/forms/${form.id}/responses`}
          className="text-green-600 hover:underline text-sm"
        >
          View Responses
        </Link>
      </div>
    </div>
  );
}
