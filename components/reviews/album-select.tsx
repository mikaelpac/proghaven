"use client";

// components/ArtistSearch.tsx
import React, { useState } from "react";
import SearchDropdown from "@/components/ui/dropdown";

const ArtistSearch = () => {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  // Mock artist data
  const artists = ["Artist 1", "Artist 2", "Artist 3"];

  return (
    <div>
      {/*       <h2>Artist Search</h2>
      <SearchDropdown
        placeholder="Search for artists"
        items={artists}
        onSelect={(artist) => setSelectedArtist(artist)}
      />
      {selectedArtist && <p>Selected Artist: {selectedArtist}</p>} */}
    </div>
  );
};

export default ArtistSearch;
