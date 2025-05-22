// app/api/admin/applications/route.js
// import { verifyAdmin } from '@/lib/api-utils';
import { NextResponse } from 'next/server';

// GET all applications with filters
export async function GET(request) {
  try {
    // await verifyAdmin();
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get('formId');
    const status = searchParams.get('status');
    
    let query = supabase
      .from('applications')
      .select(`
        *,
        form:application_forms(title),
        user:profiles(full_name, email)
      `)
      .order('submitted_at', { ascending: false });

    if (formId) query = query.eq('form_id', formId);
    if (status) query = query.eq('status', status);

    const { data: applications, error } = await query;

    if (error) throw error;
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}