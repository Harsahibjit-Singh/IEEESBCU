// File: app/api/forms/[id]/route.js
import { supabase } from '@/app/lib/supabaseClient';

export async function GET(_request, context) {
  const { params } = await context;
  const form_id = params.id;

  const { data, error } = await supabase
    .from('forms')
    .select(`*, sections(*, questions(*))`)
    .eq('id', form_id)
    .single();
console.log('Received form_id param:', form_id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}