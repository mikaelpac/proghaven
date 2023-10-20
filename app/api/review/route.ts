import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase-server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
/* import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis"; */

export async function POST(request: Request) {
  const { review, album, artist } = await request.json();

  // Get Supabase Client
  const supabase = createRouteHandlerClient<Database>({ cookies });

  // Check User is logged in
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  if (!review || !album || !artist) {
    return NextResponse.json(
      {
        message: "Wrong payload.",
      },
      {
        status: 400,
      }
    );
  }

  //TODO: Implement rate limiting

  const identifier = session?.user.id;

  // Insert a new review
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      review_rating: review.rating,
      review_summary: review.summary,
      review_text: review.text,
      album_id: 123123123213,
      user_id: "sfsefsefsefe",
    })
    .select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
