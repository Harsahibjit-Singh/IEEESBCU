'use client';

import { useEffect, useState } from 'react';

export default function ImageUploader({ fieldName }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const MAX_SIZE_MB = 10;
  const isSingleImageField = fieldName === 'logo' || fieldName === 'upper'; // Add other single-image fields here

  useEffect(() => {
    if (!fieldName) return;

    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/settings/update-branch-field/upload-image?field_name=${fieldName}`);
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
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate file size
    const oversizedFiles = files.filter(file => file.size > MAX_SIZE_MB * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed maximum size of ${MAX_SIZE_MB}MB`);
      return;
    }

    // Validate single image fields
    if (isSingleImageField) {
      if (files.length > 1) {
        setError(`Only one image allowed for ${fieldName}`);
        return;
      }
      if (images.length > 0) {
        setError(`Replace the existing ${fieldName} image instead`);
        return;
      }
    }

    try {
      setUploading(true);
      setError('');

      // Process uploads
      const uploadedUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('field_name', fieldName);

        const res = await fetch('/api/settings/update-branch-field/upload-image', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        uploadedUrls.push(data.url);
      }

      // Update state based on field type
      if (isSingleImageField) {
        setImages(uploadedUrls.slice(0, 1)); // Only keep first image
      } else {
        setImages(prev => [...prev, ...uploadedUrls]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (url) => {
    try {
      const res = await fetch(
        `/api/settings/update-branch-field/upload-image?field_name=${fieldName}&image_url=${encodeURIComponent(url)}`,
        { method: 'DELETE' }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');

      setImages(prev => prev.filter(img => img !== url));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-lg mb-4 bg-gradient-to-br from-gray-800 via-gray-700 to-blue-900">
      <label className="block mb-3 text-sm font-medium text-white">
        {isSingleImageField ? `Upload ${fieldName} (Single Image)` : 'Upload Images (Multiple Allowed)'}
        <span className="ml-2 text-xs text-gray-400">Max {MAX_SIZE_MB}MB per image</span>
      </label>
      
      <div className="flex items-center gap-3 mb-4">
        <label className="px-4 py-2 rounded bg-gradient-to-r from-blue-700 to-blue-800 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer">
          {uploading ? 'Uploading...' : 'Select Files'}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            multiple={!isSingleImageField}
            className="hidden"
          />
        </label>
        {uploading && (
          <div className="text-sm text-blue-300">Processing...</div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-3 p-2 bg-gray-900 rounded">
          {error}
        </p>
      )}

      {images.length > 0 ? (
        <div className={`grid ${isSingleImageField ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4`}>
          {images.map((url) => (
            <div key={url} className="relative group">
              <img 
                src={url} 
                alt="Uploaded content" 
                className="w-full h-40 object-contain rounded-lg bg-gray-900 p-2 border border-gray-600" 
              />
              <button
                onClick={() => handleDelete(url)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-xs text-white truncate">{url.split('/').pop()}</p>
                <p className="text-xs text-gray-300">
                  {isSingleImageField ? 'Main Image' : `Image ${images.indexOf(url) + 1}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 rounded-lg border-2 border-dashed border-gray-600 text-gray-400">
          {isSingleImageField ? `No ${fieldName} image uploaded` : 'No images uploaded yet'}
        </div>
      )}
    </div>
  );
}