// server/routes/api/artist.ts

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase-server";
import { cookies } from "next/headers";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistName = searchParams.get("name");
  const decodedArtistName = decodeURIComponent(artistName as string);

  const supabase = createRouteHandlerClient<Database>({ cookies });

  if (!artistName) {
    return new Response("Query parameter 'name' is required.", {
      status: 400,
    });
  }

  try {
    // Fetch artist data from Supabase
    const { data, error } = await supabase
      .from("artists")
      .select("artist_id, name, genres")
      .eq("name", decodedArtistName)
      .maybeSingle();

    if (error) {
      console.log(error);
      throw error;
    }

    if (!data) {
      return new Response("Artist not found.", {
        status: 404,
      });
    }

    console.log(data);
    return NextResponse.json(data); // Return the artist data
  } catch (error) {
    console.error("Error:", error);
    return new Response("An error occurred while fetching artist data.", {
      status: 500,
    });
  }
}
