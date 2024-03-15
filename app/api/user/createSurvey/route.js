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
    const surveyBody={
      "survey_id": data[0].id,
      "option_1":0,
      "option_2":0,
      "option_3":0,
      "option_4":0
    }
    const {survey_data,survey_error} = await supabase.from('public_survey').insert(surveyBody).select('*');
    return NextResponse.json({ data: data,survey_data:surveyBody }, { status: 200 });
  }
}
