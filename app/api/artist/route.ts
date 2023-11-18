// server/routes/api/artist.ts

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artistName = searchParams.get("artist");
  const genres = searchParams.get("genres");

  if (!artistName) {
    return new Response("Query parameter 'name' is required.", {
      status: 400,
    });
  }

  const decodedArtistName = decodeURIComponent(artistName);
  const parsedGenres = genres ? JSON.parse(genres) : null;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    // Fetch artist data from Supabase
    const { data, error } = await supabase
      .from("artists")
      .select("artist_id, artist, genres")
      .eq("artist", decodedArtistName)
      .maybeSingle();

    if (error) {
      console.log(error);
      throw error;
    }

    if (!data) {
      // Artist not found, return an error response
      return new Response("Artist not found.", {
        status: 404,
      });
    }

    console.log(data);
    return NextResponse.json(data); // Return the artist data
  } catch (error) {
    console.error("Error:", error);
    return new Response("An error occurred while processing the artist.", {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const { artist, genres } = await request.json();
  console.log(genres);

  if (!artist) {
    return new Response("Request body must include 'name'.", {
      status: 400,
    });
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    // Fetch artist data from Supabase
    const { data, error } = await supabase
      .from("artists")
      .select("artist_id, artist, genres")
      .eq("artist", artist)
      .maybeSingle();

    if (error) {
      console.log(error);
      throw error;
    }

    if (!data) {
      // Artist not found, insert a new one
      const { data: newArtist, error: insertError } = await supabase
        .from("artists")
        .insert([
          {
            artist: artist,
            genres: genres,
          },
        ])
        .single();

      if (insertError) {
        console.error("Error inserting artist:", insertError);
        return new Response("Failed to insert artist data.", {
          status: 500,
        });
      }

      return NextResponse.json(newArtist);
    }

    console.log(data);
    return NextResponse.json(data); // Return the artist data
  } catch (error) {
    console.error("Error:", error);
    return new Response("An error occurred while processing the artist.", {
      status: 500,
    });
  }
}
