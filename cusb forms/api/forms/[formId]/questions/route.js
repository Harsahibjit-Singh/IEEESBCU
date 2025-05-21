// app/api/admin/forms/[formId]/questions/route.js
// import { verifyAdmin } from '@/lib/api-utils';
import { NextResponse } from 'next/server';

// GET all questions for a form
export async function GET(request, { params }) {
  try {
    // await verifyAdmin();
    const { formId } = params;

    const { data: questions, error } = await supabase
      .from('form_question_assignments')
      .select(`
        display_order,
        question:form_questions (
          id,
          question_text,
          question_type,
          options,
          is_required
        )
      `)
      .eq('form_id', formId)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// POST add question to form
export async function POST(request, { params }) {
  try {
    // await verifyAdmin();
    const { formId } = params;
    const { questionId, display_order } = await request.json();

    // First check if question exists
    const { data: question, error: questionError } = await supabase
      .from('form_questions')
      .select('id')
      .eq('id', questionId)
      .single();

    if (questionError || !question) throw new Error('Question not found');

    // Add to form
    const { data: assignment, error } = await supabase
      .from('form_question_assignments')
      .insert({
        form_id: formId,
        question_id: questionId,
        display_order
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(assignment);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}