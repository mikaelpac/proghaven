"use client";
// Import the required modules and interfaces
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { extractImageUrls } from "@/utils/helpers";
import { albumExcludeStrings } from "@/utils/constants";
import { convertImageToBase64 } from "@/utils/helpers";

interface AlbumSelectProps {
  selectedArtist: string;
  onAlbumSelect: (album: Album | undefined) => void;
}

interface Album {
  name: string;
  images: string[];
  base64Image: string | undefined;
}

const AlbumSelect: React.FC<AlbumSelectProps> = ({
  selectedArtist,
  onAlbumSelect,
}) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setError(null);
        const response = await fetch(`api/lastfm?artist=${selectedArtist}`);
        const data = await response.json();

        if (data.topalbums.album) {
          const albumsData = await Promise.all(
            data.topalbums.album.map(async (album: any) => {
              const imageUrl = extractImageUrls(album.image)[0]; // Store the URL in a separate variable
              const base64Image = await convertImageToBase64(imageUrl);
              return {
                name: album.name,
                images: extractImageUrls(album.image),
                base64Image: base64Image,
              };
            })
          );

          // Filter the albums to exclude those with names containing any exclude strings
          const filteredAlbums = albumsData.filter((album: any) => {
            return !albumExcludeStrings.some((excludeString) =>
              album.name.toLowerCase().includes(excludeString)
            );
          });

          setAlbums(filteredAlbums);
        } else {
          setError("No albums found.");
          setAlbums([]);
        }
      } catch (error) {
        setError("An error occurred while fetching albums.");
        console.error("Error:", error);
      }
    };

    selectedArtist && fetchAlbums();
  }, [selectedArtist]);

  const handleAlbumSelect = (albumName: string) => {
    const selectedAlbumObject = albums.find(
      (album) => album.name === albumName
    );
    onAlbumSelect(selectedAlbumObject); // Pass album data to the parent component
  };

  console.log(albums);

  return (
    <div className="mt-2">
      <Label>Select album</Label>
      <Select onValueChange={handleAlbumSelect}>
        <SelectTrigger className="md:w-[300px] w-full bg-[#242424] text-white">
          <SelectValue placeholder="Select album" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {albums.map((album) => (
              <SelectItem value={album.name} key={album.name}>
                {album.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-red-600 ml-2 mt-2 text-xs">{error}</p>}
    </div>
  );
};

export default AlbumSelect;
