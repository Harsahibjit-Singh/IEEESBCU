import { supabase } from '@/app/lib/supabaseClient.js';
import { NextResponse } from 'next/server';

// GET all executives
export async function GET() {
  const { data, error } = await supabase.from('executives').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST to add new executive
export async function POST(req) {
  const body = await req.json();
  const { data, error } = await supabase.from('executives').insert([body]).select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}


// | Search type     | Example URL                                    |
// | --------------- | ---------------------------------------------- |
// | Search by name  | `/api/executives/search?name=har`              |
// | Search by UniID | `/api/executives/search?UniID=123456`          |
// | Search by MemID | `/api/executives/search?MemID=987654`          |
// | Combined search | `/api/executives/search?name=jit&UniID=123456` |


// search, add to old executives