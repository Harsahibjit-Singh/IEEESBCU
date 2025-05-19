// app/api/settings/update-branch-field/route.js
import { supabase } from '@/app/lib/supabaseClient';

export async function PUT(request) {
  try {
    const body = await request.json();
    const { field_name, field_content, field_images } = body;

    if (!field_name) {
      return new Response(JSON.stringify({ error: 'field_name is required' }), { status: 400 });
    }

    if (field_content === undefined && field_images === undefined) {
      return new Response(JSON.stringify({ error: 'No data provided to update' }), { status: 400 });
    }

    const updates = {};
    if (field_content !== undefined) updates.field_content = field_content;
    if (field_images !== undefined) updates.field_images = field_images;

    const { data, error } = await supabase
      .from('branch_fields')
      .update(updates)
      .eq('field_name', field_name)
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Updated successfully', data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const field_name = searchParams.get('field_name');

    if (!field_name) {
      return new Response(JSON.stringify({ error: 'field_name query parameter is required' }), { status: 400 });
    }

    const { data, error } = await supabase
      .from('branch_fields')
      .select('field_content, field_images')
      .eq('field_name', field_name)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
}
