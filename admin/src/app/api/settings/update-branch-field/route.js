// app/api/settings/update-branch-field/route.js
import { supabase } from '@/app/lib/supabaseClient';

export async function PUT(request) {
  try {
    const body = await request.json();
    const { field_content, field_images } = body;

    if (!field_content && !field_images) {
      return new Response(JSON.stringify({ error: 'No data provided to update' }), { status: 400 });
    }

    const updates = {};
    if (field_content !== undefined) updates.field_content = field_content;
    if (field_images !== undefined) updates.field_images = field_images;

    const { data, error } = await supabase
      .from('branch_fields')
      .update(updates)
      .eq('field_name', 'branch name')
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Updated successfully', data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('branch_fields')
      .select('field_content, field_images')
      .eq('field_name', 'branch name')
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
}
