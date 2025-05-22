// app/api/admin/forms/route.js
import { supabase } from '@/app/lib/supabaseClient';
import { NextResponse } from 'next/server';

// GET all forms
export async function GET() {
  try {
  
    
    const { data: forms, error } = await supabase
      .from('application_forms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(forms);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

// POST create new form
export async function POST(request) {
  try {
    // await verifyAdmin();
    const formData = await request.json();

    const { data: form, error } = await supabase
      .from('application_forms')
      .insert(formData)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}