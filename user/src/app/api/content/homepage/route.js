import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('branch_fields')
      .select('*');

    if (error) throw error;
    if (!data || data.length === 0) throw new Error('No branch data found');

    // Transform data into a more usable format
    const transformedData = data.reduce((acc, item) => {
      acc[item.field_name] = {
        content: item.field_content,
        images: item.field_images || []
      };
      return acc;
    }, {});

    return new Response(JSON.stringify(transformedData), {
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