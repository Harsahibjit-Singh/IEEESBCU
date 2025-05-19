import { supabase } from '@/app/lib/supabaseClient.js';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get('name');
  const uniid = searchParams.get('uniid');
  const memid = searchParams.get('memid');
  const start = searchParams.get('start_date');
  const end = searchParams.get('end_date') || new Date().toISOString().split('T')[0]; // default to today
  const society = searchParams.get('society');
  const rank = searchParams.get('rank');


  // -------- Search in executives (active) --------
  let execQuery = supabase.from('executives').select('*');

  if (name) execQuery = execQuery.ilike('name', `%${name}%`);
  if (uniid) execQuery = execQuery.ilike('uniid', `%${uniid}%`);
  if (memid) execQuery = execQuery.ilike('memid', `%${memid}%`);
  if (start) execQuery = execQuery.gte('start_date', start);
  if (end) execQuery = execQuery.lte('start_date', end); // use start_date as there's no end_date
  if (society) execQuery = execQuery.eq('society', society);
  if (rank) execQuery = execQuery.eq('rank', rank);

  const { data: currentExecs, error: execError } = await execQuery;

  // -------- Search in old_executives (archived) --------
  let oldQuery = supabase.from('old_executives').select('*');

  if (name) oldQuery = oldQuery.ilike('name', `%${name}%`);
  if (uniid) oldQuery = oldQuery.ilike('uniid', `%${uniid}%`);
  if (memid) oldQuery = oldQuery.ilike('memid', `%${memid}%`);
  if (start) oldQuery = oldQuery.gte('start_date', start);
  if (end) oldQuery = oldQuery.lte('end_date', end);
  if (society) oldQuery = oldQuery.eq('society', society);
  if (rank) oldQuery = oldQuery.eq('rank', rank);
  const { data: oldExecs, error: oldError } = await oldQuery;

  // -------- Error Handling --------
  if (execError || oldError) {
    return NextResponse.json(
      { error: execError?.message || oldError?.message },
      { status: 500 }
    );
  }

  // -------- Combine & Tag Results --------
  const combinedResults = [
    ...(currentExecs || []).map(e => ({ ...e, status: 'Current' })),
    ...(oldExecs || []).map(e => ({ ...e, status: 'Former' })),
  ];

  return NextResponse.json(combinedResults);
}


// in frontend defaulting end_date to today's date (or it's manually provided as today or earlier),

// for frontend to filter out current and former executives
// const current = results.filter(r => r.status === 'Current');
// const former = results.filter(r => r.status === 'Former');
//can have multiple sociteies, ranks