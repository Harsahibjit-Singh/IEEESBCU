// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // for update access

export const supabase = createClient(supabaseUrl, supabaseKey);

// // lib/supabaseClient.js
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // for update access
// const supabasesrk= SUPABASE_SERVICE_ROLE_KEY;


// // Choose the key depending on environment or use case
// const isServer = typeof window === 'undefined';
// const supabaseKey = isServer ?  supabasesrk : anonKey;

// export const supabase = createClient(supabaseUrl, supabaseKey);
