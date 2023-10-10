"use client";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ArtistSelect = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [artists, setArtists] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  let timer: NodeJS.Timeout | null = null;

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
    const handleSearch = async () => {
      try {
        setError(null);
        const response = await fetch(`api/lastfm?search=${searchInput}`);
        const data = await response.json();

        const artistNames = data?.results?.artistmatches?.artist.map(
          (artist: any) => artist.name
        );

        if (artistNames && artistNames.length > 0) {
          const filteredArtists = artistNames.filter((artist: string) => {
            return !excludeStrings.some((excludeString) =>
              artist.toLowerCase().includes(excludeString)
            );
          });

          setArtists(filteredArtists);
          setIsDropdownOpen(true); // Open the dropdown when artists are found
        } else {
          setError("No artists found.");
          setArtists([]);
          setIsDropdownOpen(false); // Close the dropdown when no artists are found
        }
      } catch (error) {
        setError("An error occurred while fetching artists.");
        console.error("Error:", error);
      }
    };

    if (searchInput) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(handleSearch, 500);
    } else {
      setArtists([]);
      setIsDropdownOpen(false); // Close the dropdown when the search input is empty
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchInput]);

  const handleArtistSelect = (selectedItem: string) => {
    setSelectedArtist(selectedItem);
    setIsDropdownOpen(false); // Close the dropdown when an artist is selected
  };

  return (
    <div className="flex flex-row gap-4">
      <Input type="email" placeholder="Search for artist" />
      <Button>Continue</Button>
      {/*  {isDropdownOpen && (
        <Dropdown items={artists} onSelect={handleArtistSelect} />
      )} */}

      {error && <p className="error">{error}</p>}

      {selectedArtist && (
        <div>
          <h2>Selected Artist: {selectedArtist}</h2>
        </div>
      )}
    </div>
  );
};

export default ArtistSelect;
