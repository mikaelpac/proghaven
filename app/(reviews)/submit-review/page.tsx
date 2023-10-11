"use client";
import Container from "@/components/Container";
import { useState } from "react";
import ArtistSelect from "@/components/reviews/artist-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AlbumSelect from "@/components/reviews/album-select";

const SubmitReview = () => {
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [selectedAlbum, setSelectedAlbum] = useState<string>("");

  const handleSelectedArtist = (artist: string) => {
    setSelectedArtist(artist);
  };

  const handleSelectedAlbum = (album: string) => {
    setSelectedAlbum(album);
  };

  return (
    <Container>
      <div className="text-2xl text-center mt-12">Submit a Review</div>

      <div className="w-full  max-w-4xl mx-auto mt-12 mb-12 rounded-md">
        <div className="max-w-2xl flex justify-evenly mx-auto">
          <ArtistSelect onArtistSelect={handleSelectedArtist} />
          <AlbumSelect
            selectedArtist={selectedArtist}
            onAlbumSelect={handleSelectedAlbum}
          />
        </div>
      </div>
    </Container>
  );
};

export default SubmitReview;
