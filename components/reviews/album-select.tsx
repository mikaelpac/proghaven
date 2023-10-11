// ArtistSelect.tsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Update with your import path
import DropDownItem from "../ui/dropdown/drop-down-item"; // Update with your import path
import DropDown from "../ui/dropdown/drop-down"; // Update with your import path

interface AlbumSelectProps {
  selectedArtist: string;
  onAlbumSelect: (album: string) => void;
}

const AlbumSelect: React.FC<AlbumSelectProps> = ({
  onAlbumSelect,
  selectedArtist,
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState<string>(""); // Add selectedArtist state
  const [albums, setAlbums] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleArtistSelect = (selectedItem: string) => {
    setSelectedAlbum(selectedItem);
    setIsDropdownOpen(false); // Close the dropdown when an artist is selected
  };

  console.log(selectedArtist);

  useEffect(() => {
    const handleGetAlbums = async () => {
      try {
        setError(null);
        const response = await fetch(`api/lastfm?artist=${selectedArtist}`);

        //TODO: need to probably fetch next pages too if they exist, lastfm only returns an array of 8 albums
        const data = await response.json();
        const albumsData = data?.topalbums?.album?.map(
          (album: any) => album.name
        );

        if (albumsData && albumsData.length > 1) {
          setAlbums(albumsData);
          //  setIsDropdownOpen(true);
        } else {
          setError("No albums found.");
          setAlbums([]);
          //   setIsDropdownOpen(false);
        }
      } catch (error) {
        setError("An error occurred while fetching albmus.");
        console.error("Error:", error);
      }
    };

    // Fetch list of albums when selected artist exists & changes
    selectedArtist && handleGetAlbums();
  }, [selectedArtist]);

  console.log(albums);

  return (
    <div className="flex flex-col">
      {error && <p className="text-red-600 ml-2 mt-2 text-xs">{error}</p>}
      {/*  {isDropdownOpen && (
        <DropDown label={null}>
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
      )} */}
    </div>
  );
};

export default AlbumSelect;
