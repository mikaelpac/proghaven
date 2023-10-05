import { NextResponse } from "next/server";

const apiKey = process.env.LAST_FM_API_KEY;
const baseUrl = "http://ws.audioscrobbler.com/2.0/";

export async function GET(request: Request) {
  console.log("API Key:", apiKey);
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const query = `?method=artist.search&artist=${search}&api_key=${apiKey}&format=json`;

  /*  if (!searchInput) {
    return new Response("Query parameter 'search_input' is required.", {
      status: 400,
    }); */

  try {
    console.log(baseUrl + query);
    // Fetch data from Last.fm API
    const response = await fetch(baseUrl + query);
    if (!response.ok) {
      // Handle API error
      return new Response("Failed to fetch data from Last.fm API.", {
        status: response.status,
      });
    }

    console.log(response.body);

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
