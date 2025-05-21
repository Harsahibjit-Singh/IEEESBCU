'use client';
import { useEffect, useState } from 'react';

export default function ImageUploader({ fieldName }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing images
  useEffect(() => {
    if (!fieldName) return;

    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/settings/update-branch-field//upload-image?field_name=${fieldName}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch images');

        setImages(data.field_images || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchImages();
  }, [fieldName]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('field_name', fieldName);

    try {
      setUploading(true);
      setError('');

      const res = await fetch('/api/settings/update-branch-field//upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setImages((prev) => [...prev, data.url]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (url) => {
    try {
      const res = await fetch(
        `/api/settings/update-branch-field//upload-image?field_name=${fieldName}&image_url=${encodeURIComponent(url)}`,
        { method: 'DELETE' }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');

      setImages((prev) => prev.filter((img) => img !== url));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="mb-4"
      />
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <div className="grid grid-cols-3 gap-4">
        {images.map((url) => (
          <div key={url} className="relative">
            <img src={url} alt="Uploaded" className="w-full h-32 object-cover rounded" />
            <button
              onClick={() => handleDelete(url)}
              className="absolute top-1 right-1 text-xs bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


//in frontend write only upload image max of 10 mb not more than that
// also make such feature to add more than one image at a time