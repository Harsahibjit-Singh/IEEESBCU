// File: app/api/forms/create/route.js
import { supabase } from '@/app/lib/supabaseClient';

export async function POST(req) {
  const body = await req.json();
  const { title, description, created_by } = body;

  const { data, error } = await supabase.from('forms').insert([{ title, description, created_by }]).select().single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}