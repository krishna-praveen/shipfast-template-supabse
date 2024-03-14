import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req,res, next) {
  const id = req.nextUrl.searchParams.get("id");
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.from("user_created_polls").select("*").eq("id", id);
  if (error) {
    return NextResponse.json({ "error": error.message }, { status: 500 });
  }
  return NextResponse.json({ "data": data}, { status: 200 });
}

