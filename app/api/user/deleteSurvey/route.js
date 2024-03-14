import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const { session } = data;
  
  if (session) {
    const body = await req.json();
    const { error } = await supabase
    .from('user_created_polls')
    .delete()
    .eq('id', body.id)
    return NextResponse.json({ "data": "result"}, { status: 200 });
}
}

