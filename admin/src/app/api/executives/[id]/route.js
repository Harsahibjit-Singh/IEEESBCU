// app/api/executives/[id]/route.js
import { supabase } from '@/app/lib/supabaseClient.js';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  const { data, error } = await supabase
    .from('executives')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req, { params }) {
  const body = await req.json();
  const { data, error } = await supabase
    .from('executives')
    .update(body)
    .eq('id', params.id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function DELETE(_, { params }) {
  const { data, error } = await supabase
    .from('executives')
    .delete()
    .eq('id', params.id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: 'Deleted', deleted: data[0] });
}
