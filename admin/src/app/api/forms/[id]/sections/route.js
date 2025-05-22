// File: app/api/forms/[id]/sections/route.js
import { supabase } from '@/app/lib/supabaseClient';

export async function POST(req, { params }) {
  const body = await req.json();
  const { title, order } = body;
  const form_id = params.id;

  const { data, error } = await supabase.from('sections').insert([{ form_id, title, order }]).select().single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
