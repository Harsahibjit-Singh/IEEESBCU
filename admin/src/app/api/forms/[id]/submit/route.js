// File: app/api/forms/[id]/submit/route.js
import { supabase } from '@/app/lib/supabaseClient';

export async function POST(req, { params }) {
  const body = await req.json();
  const { user_id, answers } = body;
  const form_id = params.id;

  const { data: response, error: responseError } = await supabase
    .from('responses')
    .insert([{ form_id, user_id }])
    .select()
    .single();

  if (responseError) return Response.json({ error: responseError.message }, { status: 500 });

  const answersToInsert = answers.map((a) => ({
    response_id: response.id,
    question_id: a.question_id,
    answer: a.answer,
  }));

  const { error: answerError } = await supabase.from('answers').insert(answersToInsert);

  if (answerError) return Response.json({ error: answerError.message }, { status: 500 });
  return Response.json({ success: true });
}