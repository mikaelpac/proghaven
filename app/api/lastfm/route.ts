// server/routes/api/lastfm.ts

import { NextResponse } from "next/server";

const apiKey = process.env.LAST_FM_API_KEY;
const baseUrl = "http://ws.audioscrobbler.com/2.0/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get("artist");
  const album = searchParams.get("album");
  const searchQuery = searchParams.get("search");

  let query;

  if (album && artist) {
    // If an album and artist are specified, fetch album info
    query = `?method=album.getinfo&artist=${artist}&album=${album}&api_key=${apiKey}&format=json`;
  } else if (searchQuery) {
    // If 'search' is present, fetch artist search results
    query = `?method=artist.search&artist=${searchQuery}&limit=7&api_key=${apiKey}&format=json`;
  } else if (artist) {
    // If 'artist' is present, fetch top albums by the artist
    query = `?method=artist.getTopAlbums&artist=${artist}&limit=14&api_key=${apiKey}&format=json`;
  } else {
    // If neither 'album', 'search', nor 'artist' is present, return an error
    return new Response(
      "Query parameter 'artist', 'search', or 'album' is required.",
      {
        status: 400,
      }
    );
  }

  try {
    // Fetch data from Last.fm API
    const response = await fetch(baseUrl + query);
    if (!response.ok) {
      // Handle API error
      return new Response("Failed to fetch data from Last.fm API.", {
        status: response.status,
      });
    }

    // Parse and return the JSON response
    const data = await response.json();
    return NextResponse.json(data); // Return the parsed JSON data
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      "An error occurred while fetching data from Last.fm API.",
      { status: 500 }
    );
  }
}
