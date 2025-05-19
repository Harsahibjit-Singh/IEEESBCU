// app/api/settings/update-branch-field/route.js
import { supabase } from '@/app/lib/supabaseClient';

// Helper function to validate image files
const validateImageFile = (file) => {
  const MAX_SIZE = 10 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml'
  ];

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Only JPG, PNG, WEBP, GIF, and SVG images are allowed');
  }

  if (file.size > MAX_SIZE) {
    throw new Error(`Image must be smaller than ${MAX_SIZE / 1024 / 1024}MB`);
  }
};

// GET - Fetch existing images for a field
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fieldName = searchParams.get('field_name');

    if (!fieldName) {
      return Response.json(
        { error: 'field_name parameter is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('branch_fields')
      .select('field_images')
      .eq('field_name', fieldName)
      .single();

    if (error) throw error;

    // Return empty array if null
    return Response.json({
      field_images: data?.field_images || []
    });

  } catch (error) {
    return Response.json(
      { error: error.message || 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// POST - Upload new image and add to array
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const fieldName = formData.get('field_name');

    if (!file || !fieldName) {
      return Response.json(
        { error: 'Both file and field_name are required' },
        { status: 400 }
      );
    }

    // Validate file
    validateImageFile(file);

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${fieldName}/${crypto.randomUUID()}.${fileExt}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('branch-fields')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('branch-fields')
      .getPublicUrl(uploadData.path);

    // Update database (append to array)
    const { error: dbError } = await supabase.rpc('append_image_url', {
      field_name: fieldName,
      image_url: publicUrl
    });

    if (dbError) throw dbError;

    return Response.json({ url: publicUrl });

  } catch (error) {
    return Response.json(
      { error: error.message || 'Image upload failed' },
      { status: 500 }
    );
  }
}

// DELETE - Remove an image URL
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fieldName = searchParams.get('field_name');
    const imageUrl = searchParams.get('image_url');

    if (!fieldName || !imageUrl) {
      return Response.json(
        { error: 'Both field_name and image_url are required' },
        { status: 400 }
      );
    }

    // Extract filename from URL
    const filePath = imageUrl.split('/branch-fields/')[1];
    if (!filePath) {
      throw new Error('Invalid image URL format');
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('branch-fields')
      .remove([filePath]);

    if (storageError) throw storageError;

    // Remove from database array
    const { error: dbError } = await supabase.rpc('remove_image_url', {
      field_name: fieldName,
      image_url: imageUrl
    });

    if (dbError) throw dbError;

    return Response.json({ success: true });

  } catch (error) {
    return Response.json(
      { error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}