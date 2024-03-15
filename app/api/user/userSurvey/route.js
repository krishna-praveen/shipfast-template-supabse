import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const { session } = data;
  
  if (session) {
    const data = await supabase.from('user_polls').select().eq('user_id', session.user.id);
    const result=[];
    data.data.forEach(({ title, option_1, option_2, option_3, option_4, id, option_1_text, option_2_text, option_3_text, option_4_text }) => {
      const options = { option_1, option_2, option_3, option_4 };
      const optionTexts = { option_1: option_1_text, option_2: option_2_text, option_3: option_3_text, option_4: option_4_text };
      const maxOption = Object.entries(options).reduce((a, b) => (b[1] > a[1] ? b : a));
      const object = {};
      object.survey_title = title;
      object.survey_max_option = maxOption[1];
      object.survey_max_option_name = optionTexts[maxOption[0]];
      object.id = id; 
      result.push(object);
    });

    return NextResponse.json({ "data": result}, { status: 200 });
}
}

