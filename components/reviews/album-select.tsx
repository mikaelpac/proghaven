// ArtistSelect.tsx
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

interface AlbumSelectProps {
  selectedArtist: string;
  onAlbumSelect: (album: Album | undefined) => void;
}

interface Album {
  name: string;
  images: string[];
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

        if (data?.topalbums?.album) {
          const albumsData = data.topalbums.album.map((album: any) => ({
            name: album.name,
            images: extractImageUrls(album.image),
          }));
          setAlbums(albumsData);
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
    onAlbumSelect(selectedAlbumObject); // Pass album data to parent page
  };

  return (
    <div className="mt-4">
      <Label>Select album</Label>
      <Select onValueChange={handleAlbumSelect}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select an album" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Albums</SelectLabel>
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
