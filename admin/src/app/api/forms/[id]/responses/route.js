// File: app/api/forms/[id]/responses/route.js
import { supabase } from '@/app/lib/supabaseClient';

export async function GET(_, { params }) {
  const form_id = params.id;

  const { data, error } = await supabase
    .from('responses')
    .select(`*, answers(*, question_id)`) // optional: join with profiles if needed
    .eq('form_id', form_id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
