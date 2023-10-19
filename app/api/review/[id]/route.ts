import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // Get Supabase Client
  const supabase = createRouteHandlerClient<Database>({ cookies });

  // Delete a review
  const { error } = await supabase.from("reviews").delete().match({ id });

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ message: "Review deleted." }, { status: 200 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { review_text } = await req.json();
  if (!review_text || typeof review_text !== "string") {
    return NextResponse.json({ message: "Wrong payload." }, { status: 400 });
  }
  // Create Supabase Client
  const supabase = createRouteHandlerClient<Database>({ cookies });

  // Update a review
  const { data, error } = await supabase
    .from("reviews")
    .update({ review_text })
    .match({ id })
    .select("*");

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
