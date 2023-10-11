// ArtistSelect.tsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Update with your import path
import DropDownItem from "../ui/dropdown/drop-down-item"; // Update with your import path
import DropDown from "../ui/dropdown/drop-down"; // Update with your import path

interface ArtistSelectProps {
  onArtistSelect: (artist: string) => void;
}

const ArtistSelect: React.FC<ArtistSelectProps> = ({ onArtistSelect }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>(""); // Add selectedArtist state
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

  const handleArtistSelect = (selectedItem: string) => {
    setSelectedArtist(selectedItem);
    setSearchInput(selectedItem);
    setIsDropdownOpen(false); // Close the dropdown when an artist is selected
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (searchInput === selectedArtist) {
        // Prevent search when the search input is the same as the selected artist
        return;
      }

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
  }, [searchInput, selectedArtist]); // Add selectedArtist as a dependency

  console.log(error);

  return (
    <div className="flex flex-col">
      <Input
        placeholder="Find artist"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {error && <p className="text-red-600 ml-2 mt-2 text-xs">{error}</p>}
      {isDropdownOpen && (
        <DropDown>
          {artists.map((artist, index) => {
            return (
              <DropDownItem
                name={artist}
                Icon={null}
                onClick={() => handleArtistSelect(artist)}
                isLast={index === artists.length - 1}
                key={artist}
              />
            );
          })}
        </DropDown>
      )}
    </div>
  );
};

export default ArtistSelect;
