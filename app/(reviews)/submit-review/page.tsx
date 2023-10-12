"use client";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import Image from "next/image";
import ArtistSelect from "@/components/reviews/artist-select";
import AlbumSelect from "@/components/reviews/album-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReviewRating from "@/components/reviews/review-rating";
import ReviewSummary from "@/components/reviews/review-summary";
import ReviewText from "@/components/reviews/review-text";
import Spinner from "@/components/ui/spinner";
import { genres } from "@/utils/musicGenres";

const SubmitReview = () => {
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [selectedAlbum, setSelectedAlbum] = useState<Album | undefined>(
    undefined
  );
  const [albumInfo, setAlbumInfo] = useState(null);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [artistGenres, setArtistGenres] = useState<string[] | null>(null);

  interface Album {
    name: string;
    images: string[];
    base64Image: string | undefined;
  }

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        const response = await fetch(
          `api/lastfm?artist=${selectedArtist}&album=${selectedAlbum?.name}`
        );
        const data = await response.json();
        if (data.album && data.album.tags) {
          const tagNames = data.album.tags.tag.map((tag: any) => tag.name);
          const matchingGenres = genres.filter((genre) =>
            tagNames.includes(genre)
          );
          setArtistGenres(matchingGenres);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (selectedAlbum && selectedArtist) {
      fetchAlbumInfo();
    }
  }, [selectedAlbum]);

  const handleSelectedArtist = (artist: string) => {
    setSelectedAlbum(undefined);
    setSelectedArtist(artist);
  };

  const handleSelectedAlbum = (album: Album | undefined) => {
    setSelectedAlbum(album);
  };

  const handleSelectedRating = (rating: string) => {
    setSelectedRating(rating);
  };

  return (
    <Container>
      <div className="text-2xl text-center mt-6">Submit a Review</div>
      {selectedArtist && selectedAlbum && (
        <div className="text-xl text-center mt-6">
          {selectedArtist} - {selectedAlbum.name}
        </div>
      )}

      <div className="w-full max-w-[700px] mx-auto mt-6 mb-6 rounded-md flex flex-col lg:flex-row">
        <div className="w-full max-w-md mx-auto mb-6 lg:mb-0 lg:max-w-2xl lg:w-1/2 lg:mr-6">
          <ArtistSelect onArtistSelect={handleSelectedArtist} />
          {selectedArtist && (
            <div>
              <AlbumSelect
                selectedArtist={selectedArtist}
                onAlbumSelect={handleSelectedAlbum}
              />
              <ReviewRating onRatingSelect={handleSelectedRating} />
            </div>
          )}
        </div>
        <div className="w-full max-w-md mx-auto lg:max-w-2xl lg:w-1/2">
          {selectedAlbum && (
            <div className="w-full h-80 rounded-md flex items-start justify-center">
              <Image
                src={selectedAlbum.images[3]}
                alt="Album cover"
                placeholder="blur"
                blurDataURL={selectedAlbum.base64Image}
                width={300}
                height={300}
                className="rounded-md ease-in transition mt-4"
              />
            </div>
          )}
        </div>
      </div>

      {selectedAlbum && selectedArtist && (
        <div className="w-full max-w-[700px] mx-auto mb-6">
          <ReviewSummary />
          <ReviewText />
        </div>
      )}
    </Container>
  );
};

export default SubmitReview;
