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
  artistName: string;
  onAlbumSelect: (album: Album | undefined) => void;
}

interface Album {
  name: string;
  images: string[];
  base64Image: string | undefined;
}

const AlbumSelect: React.FC<AlbumSelectProps> = ({
  artistName,
  onAlbumSelect,
}) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setError(null);
        const response = await fetch(`api/lastfm?artist=${artistName}`);
        const data = await response.json();

        if (data.topalbums.album) {
          const albumsData = data.topalbums.album
            .map((album: any) => ({
              name: album.name,
              images: extractImageUrls(album.image),
            }))
            .filter(
              (album: any) =>
                !albumExcludeStrings.some((excludeString) =>
                  album.name.toLowerCase().includes(excludeString)
                )
            );

          setAlbums(albumsData);

          // Fetch base64 images for each album in parallel
          const base64Promises = albumsData.map(async (album: Album) => {
            const imageUrl = album.images[0]; // Use the first image URL
            const base64Image = await convertImageToBase64(imageUrl);
            return {
              ...album,
              base64Image: base64Image,
            };
          });

          // Wait for all base64 image promises to resolve and update the state
          const albumsWithBase64Images = await Promise.all(base64Promises);
          setAlbums(albumsWithBase64Images);
        } else {
          setError("No albums found.");
          setAlbums([]);
        }
      } catch (error) {
        setError("An error occurred while fetching albums.");
        console.error("Error:", error);
      }
    };

    artistName && fetchAlbums();
  }, [artistName]);

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
        <SelectContent className="bg-[#242424] ">
          <SelectGroup>
            {albums.map((album) => (
              <SelectItem
                value={album.name}
                key={album.name}
                className="bg-[#242424] text-[#A7A7A7] hover:bg-[#a7a7a7] hover:text-white"
              >
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
