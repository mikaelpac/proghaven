"use client";
import { useState, useEffect } from "react";

const ArtistSearch = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [artists, setArtists] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  let timer: NodeJS.Timeout | null = null; // Initialize timer with null

  const excludeStrings = [
    "ft.",
    "feat",
    ", the",
    ",",
    ".",
    "-",
    '"',
    "♪",
    "www.",
    ".com",
    "&",
  ];

  useEffect(() => {
    // Function to fetch data after a delay
    const fetchData = async () => {
      try {
        setError(null); // Clear any previous errors

        const response = await fetch(`api/lastfm?search=${searchInput}`);
        const data = await response.json();

        // Assuming the Last.fm API response structure has an array of artist names
        const artistNames = data?.results?.artistmatches?.artist.map(
          (artist: any) => artist.name
        );

        if (artistNames && artistNames.length > 0) {
          // Exclude some strings that we don't want in our artists array
          // Filter out artists with unwanted strings
          const filteredArtists = artistNames.filter((artist: string) => {
            return !excludeStrings.some((excludeString) =>
              artist.toLowerCase().includes(excludeString)
            );
          });

          setArtists(filteredArtists);
        } else {
          // Handle case where no artists are found
          setError("No artists found.");
          setArtists([]);
        }
      } catch (error) {
        // Handle errors
        setError("An error occurred while fetching artists.");
        console.error("Error:", error);
      }
    };

    // Use a timer to delay fetching data after user stops typing
    if (searchInput) {
      if (timer) {
        clearTimeout(timer); // Clear the previous timer if it exists
      }
      timer = setTimeout(fetchData, 500); // Delay for 1000 milliseconds (1 second)
    }

    // Clean up the timer when the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer); // Clear the timer during cleanup
      }
    };
  }, [searchInput]);

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for artists"
      />

      {error && <p className="error">{error}</p>}

      {artists.length > 0 && (
        <ul>
          {artists.map((artist) => (
            <li key={artist}>{artist}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtistSearch;
