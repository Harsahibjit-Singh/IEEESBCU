// app/api/admin/applications/[applicationId]/route.js
// import { verifyAdmin } from '@/lib/api-utils';
import { NextResponse } from 'next/server';

// GET application with all responses
export async function GET(request, { params }) {
  try {
    // await verifyAdmin();
    const { applicationId } = params;

    const { data: application, error: appError } = await supabase
      .from('applications')
      .select(`
        *,
        form:application_forms(title),
        user:profiles(*)
      `)
      .eq('id', applicationId)
      .single();

    if (appError) throw appError;

    const { data: responses, error: resError } = await supabase
      .from('application_responses')
      .select(`
        *,
        question:form_questions(question_text, question_type)
      `)
      .eq('application_id', applicationId);

    if (resError) throw resError;

    return NextResponse.json({ ...application, responses });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT update application status
export async function PUT(request, { params }) {
  try {
    // await verifyAdmin();
    const { applicationId } = params;
    const { status } = await request.json();

    const { data: application, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', applicationId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}