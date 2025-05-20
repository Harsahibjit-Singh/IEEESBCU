import { supabase } from '@/app/lib/supabaseClient.js';


export async function GET() {
  try {
    const { data, error } = await supabase
      .from('branch_fields')
      .select('field_images')
      .eq('field_name', 'main carousel')
      .single();

    if (error) throw error;
    if (!data) throw new Error('No carousel data found');

    return new Response(JSON.stringify(data.field_images || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}