interface Artist {
  artist_id: number;
  artist: string;
  genres: string[] | null;
  // Add other properties as needed...
}

export const checkOrInsertArtist = async (
  artist: string,
  genres: string[] | null
): Promise<Artist | null> => {
  try {
    // Fetch artist data from Supabase
    const response = await fetch(
      `/api/artist?artist=${encodeURIComponent(artist)}`
    );

    // Check for a 404 status indicating that the artist is not found
    if (response.status === 404) {
      // Artist not found, insert a new one
      const insertResponse = await fetch(`/api/artist`, {
        method: "POST",
        body: JSON.stringify({ artist, genres }), // Serialize data as JSON
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!insertResponse.ok) {
        throw new Error(
          `Failed to insert artist data. Status: ${insertResponse.status}`
        );
      }

      const newArtist = await insertResponse.json();
      return newArtist;
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch artist data. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching/inserting artist data:", error);
    return null;
  }
};
