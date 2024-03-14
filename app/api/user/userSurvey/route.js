import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const { session } = data;
  
  if (session) {

    const data = await supabase.from('user_created_polls').select().eq('user_id', session.user.id);

    const result = data.data
    console.log(result)
    return NextResponse.json({ "data": result}, { status: 200 });
}
}

