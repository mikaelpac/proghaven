"use client";
import Container from "@/components/Container";
import { useState } from "react";
import ArtistSelect from "@/components/reviews/artist-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AlbumSelect from "@/components/reviews/album-select";
import Image from "next/image";

const SubmitReview = () => {
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [selectedAlbum, setSelectedAlbum] = useState<Album | undefined>(
    undefined
  );

  interface Album {
    name: string;
    images: string[];
  }

  const handleSelectedArtist = (artist: string) => {
    setSelectedArtist(artist);
  };

  const handleSelectedAlbum = (album: Album | undefined) => {
    setSelectedAlbum(album);
  };

  console.log(selectedAlbum);

  return (
    <Container>
      <div className="text-2xl text-center mt-12">Submit a Review</div>
      {selectedArtist && selectedAlbum && (
        <div className="text-xl text-center mt-12">
          {selectedArtist} - {selectedAlbum.name}
        </div>
      )}

      <div className="w-full  max-w-4xl mx-auto mt-12 mb-12 rounded-md">
        <div className="max-w-2xl flex flex-col justify-center mx-auto">
          <ArtistSelect onArtistSelect={handleSelectedArtist} />
          {selectedArtist && (
            <AlbumSelect
              selectedArtist={selectedArtist}
              onAlbumSelect={handleSelectedAlbum}
            />
          )}

          {selectedAlbum && selectedAlbum.images[2] && (
            <div className="mt-4">
              <Image
                src={selectedAlbum.images[2]}
                alt="Album cover"
                width={300}
                className="rounded-sm"
                height={300}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SubmitReview;
