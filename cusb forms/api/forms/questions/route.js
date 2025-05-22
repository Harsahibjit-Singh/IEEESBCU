// app/api/admin/questions/route.js
// import { verifyAdmin } from '@/lib/api-utils';
import { NextResponse } from 'next/server';

// GET all questions
export async function GET() {
  try {
    // await verifyAdmin();
    
    const { data: questions, error } = await supabase
      .from('form_questions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// POST create new question
export async function POST(request) {
  try {
    // await verifyAdmin();
    const questionData = await request.json();

    const { data: question, error } = await supabase
      .from('form_questions')
      .insert(questionData)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}