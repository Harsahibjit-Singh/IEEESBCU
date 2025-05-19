import { supabase } from '@/app/lib/supabaseClient.js';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const UniID = searchParams.get('UniID');
  const MemID = searchParams.get('MemID');

  let query = supabase.from('executives').select('*');

  if (name) {
    query = query.ilike('name', `%${name}%`);
  }

  if (UniID) {
    query = query.eq('UniID', UniID);
  }

  if (MemID) {
    query = query.eq('MemID', MemID);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
