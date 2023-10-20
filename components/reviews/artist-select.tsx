"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DropDownItem from "../ui/dropdown/drop-down-item";
import DropDown from "../ui/dropdown/drop-down";
import { artistExcludeStrings } from "@/utils/constants";

interface ArtistSelectProps {
  onArtistSelect: (artist: Artist | undefined) => void;
}

interface Artist {
  name: string;
  genres: string[];
}

const ArtistSelect: React.FC<ArtistSelectProps> = ({ onArtistSelect }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [artists, setArtists] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  let timer: NodeJS.Timeout | null = null;

  const handleArtistSelect = (selectedItem: string) => {
    setSelectedArtist(selectedItem);
    setSearchInput(selectedItem);

    // Pass the entire Artist object to the onArtistSelect function
    onArtistSelect({ name: selectedItem, genres: [] });

    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (searchInput === selectedArtist) {
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
            return !artistExcludeStrings.some((excludeString) =>
              artist.toLowerCase().includes(excludeString)
            );
          });

          setArtists(filteredArtists);
          setIsDropdownOpen(true);
        } else {
          setError("No artists found.");
          setArtists([]);
          setIsDropdownOpen(false);
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
      handleArtistSelect("");
      setIsDropdownOpen(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchInput, selectedArtist]);

  return (
    <div className="flex flex-col">
      <Label className="mb-2">Select artist</Label>
      <Input
        className="md:w-[300px] w-full bg-[#242424] text-white relative"
        placeholder="Find artist"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {error && (
        <div className="bg-gray-600 px-6 py-2 text-white text-xs rounded-sm mt-1 dark:bg-sky-700">
          {error}
        </div>
      )}
      {isDropdownOpen && (
        <div className="top-28">
          <DropDown label={null}>
            {artists.map((artist, index) => (
              <DropDownItem
                name={artist}
                Icon={null}
                onClick={() => handleArtistSelect(artist)}
                isLast={index === artists.length - 1}
                key={artist}
              />
            ))}
          </DropDown>
        </div>
      )}
    </div>
  );
};

export default ArtistSelect;
