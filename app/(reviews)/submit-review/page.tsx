"use client";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import ArtistSelect from "@/components/reviews/artist-select";
import AlbumSelect from "@/components/reviews/album-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReviewRating from "@/components/reviews/review-rating";

import Image from "next/image";
import Spinner from "@/components/ui/spinner";

const SubmitReview = () => {
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [selectedAlbum, setSelectedAlbum] = useState<Album | undefined>(
    undefined
  );
  const [albumInfo, setAlbumInfo] = useState(null);
  const [selectedRating, setSelectedRating] = useState<string>("");

  interface Album {
    name: string;
    images: string[];
    base64Image: string | undefined; // Add base64Images property to Album interface
    genre: string | null;
  }

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        const response = await fetch(
          `api/lastfm?artist=${selectedArtist}&album=${selectedAlbum?.name}`
        );
        const data = await response.json();
        console.log(data.album?.tags?.tag[1].name);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (selectedArtist && selectedAlbum && !selectedAlbum.genre) {
      fetchAlbumInfo();
    }
  }, [selectedArtist, selectedAlbum]);

  const handleSelectedArtist = (artist: string) => {
    setSelectedArtist(artist);
    setSelectedAlbum(undefined);
  };

  const handleSelectedAlbum = (album: Album | undefined) => {
    setSelectedAlbum(album);
  };

  const handleSelectedRating = (rating: string) => {
    setSelectedRating(rating);
  };

  console.log(selectedRating);

  return (
    <Container>
      <div className="text-2xl text-center mt-12">Submit a Review</div>
      {selectedArtist && selectedAlbum && (
        <div className="text-xl text-center mt-12">
          {selectedArtist} - {selectedAlbum.name}
        </div>
      )}

      <div className="w-full flex flex-row  max-w-4xl mx-auto mt-12 mb-12 rounded-md">
        <div className="max-w-2xl flex flex-col justify-center mx-auto">
          <ArtistSelect onArtistSelect={handleSelectedArtist} />

          {selectedArtist && (
            <AlbumSelect
              selectedArtist={selectedArtist}
              onAlbumSelect={handleSelectedAlbum}
            />
          )}

          <div className="w-[300px] h-[300px] mt-4 rounded-sm flex items-center justify-center">
            {selectedAlbum && (
              <Image
                src={selectedAlbum.images[3]}
                alt="Album cover"
                placeholder="blur"
                blurDataURL={selectedAlbum.base64Image}
                width={300}
                height={300}
                className={`rounded-sm ease-in transition `}
              />
            )}
          </div>
        </div>
        {selectedAlbum && selectedArtist && (
          <ReviewRating onRatingSelect={handleSelectedRating} />
        )}
      </div>
    </Container>
  );
};

export default SubmitReview;
