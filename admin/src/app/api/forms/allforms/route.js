import { supabase } from '@/app/lib/supabaseClient';

export async function GET() {
  console.log("📦 GET /api/forms/list called");

  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('🔥 Supabase error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  console.log("✅ Forms fetched:", data);
  return Response.json({ forms: data });
}