import { supabase } from '@/app/lib/supabaseClient.js';
import { NextResponse } from 'next/server';

// GET all executives
export async function GET() {
  const { data, error } = await supabase.from('old_executives').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}