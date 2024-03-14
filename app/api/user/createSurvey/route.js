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
    
    if (!body.title){
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    for (let i = 1; i <= 4; i++) {
      if (!body[`option_${i}`]) {
        return NextResponse.json({ error: `Option ${i} is required` }, { status: 400 });
      }
    }

    body.user_id = session.user.id;
    const {data,error} = await supabase.from('user_created_polls').insert(body).select('*');
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data }, { status: 200 });
  }
}
