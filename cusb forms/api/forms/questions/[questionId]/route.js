// app/api/admin/questions/[questionId]/route.js
// import { verifyAdmin } from '@/lib/api-utils';
import { NextResponse } from 'next/server';

// GET single question
export async function GET(request, { params }) {
  try {
    // await verifyAdmin();
    const { questionId } = params;

    const { data: question, error } = await supabase
      .from('form_questions')
      .select('*')
      .eq('id', questionId)
      .single();

    if (error) throw error;
    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT update question
export async function PUT(request, { params }) {
  try {
    // await verifyAdmin();
    const { questionId } = params;
    const questionData = await request.json();

    const { data: question, error } = await supabase
      .from('form_questions')
      .update(questionData)
      .eq('id', questionId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE question
export async function DELETE(request, { params }) {
  try {
    // await verifyAdmin();
    const { questionId } = params;

    // First check if question is used in any forms
    const { count, error: checkError } = await supabase
      .from('form_question_assignments')
      .select('*', { count: 'exact' })
      .eq('question_id', questionId);

    if (checkError) throw checkError;
    if (count > 0) {
      throw new Error('Cannot delete question that is assigned to forms');
    }

    const { error } = await supabase
      .from('form_questions')
      .delete()
      .eq('id', questionId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}