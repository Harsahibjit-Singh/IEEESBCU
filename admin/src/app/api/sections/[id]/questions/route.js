// File: app/api/sections/[id]/questions/route.js
import { supabase } from '@/app/lib/supabaseClient';

export async function POST(req, { params }) {
  const body = await req.json();
  const { question, type, options, required } = body;
  const section_id = params.id;

  const { data, error } = await supabase.from('questions').insert([{ section_id, question, type, options, required }]).select().single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}