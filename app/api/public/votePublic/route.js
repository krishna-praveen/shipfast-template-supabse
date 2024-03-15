import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req) {
    const body = await req.json();
    console.log(body);
    const option = body.params.id;
    const supabase = createClientComponentClient();


    if (option) {
        
        const vote = parseInt(option.user_selected.match(/\d+/g)[0]);
        const survey_id = option.survey_id;
        console.log(vote);
        if (vote === 1){
            const getOption1 = await supabase.from('public_survey').select('option_1').eq('survey_id', survey_id);
            const userVote = getOption1.data[0].option_1+1;
            const {data,error} = await supabase.from('public_survey').update({option_1:userVote}).eq('survey_id', survey_id)
        }
        if (vote === 2){
            const getOption2 = await supabase.from('public_survey').select('option_2').eq('survey_id', survey_id);
            const userVote = getOption2.data[0].option_2+1;
            const {data,error} = await supabase.from('public_survey').update({option_2:userVote}).eq('survey_id', survey_id)
        }
        if (vote === 3){
            const getOption3 = await supabase.from('public_survey').select('option_3').eq('survey_id', survey_id);
            const userVote = getOption3.data[0].option_3+1;
            const {data,error} = await supabase.from('public_survey').update({option_3:userVote}).eq('survey_id', survey_id)
        }
        if (vote === 4){
            const getOption4 = await supabase.from('public_survey').select('option_4').eq('survey_id', survey_id);
            const userVote = getOption4.data[0].option_4+1;
            const {data,error} = await supabase.from('public_survey').update({option_4:userVote}).eq('survey_id', survey_id)
        }
 
            

    }
        return NextResponse.json({ "data": "result"}, { status: 200 });
    

}
