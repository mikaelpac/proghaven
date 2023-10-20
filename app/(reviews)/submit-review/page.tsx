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
import { Separator } from "@/components/ui/separator";

const SubmitReview = () => {
  const [artist, setArtist] = useState<Artist | undefined>(undefined);
  const [album, setAlbum] = useState<Album | undefined>(undefined);
  const [base64Img, setBase64Img] = useState<string>("");

  const [review, setReview] = useState<Review | undefined>(undefined);
  const [selectedRating, setSelectedRating] = useState<number>();
  const [artistGenres, setArtistGenres] = useState<string[] | null>(null);
  const [reviewSummary, setReviewSummary] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");

  interface Artist {
    name: string;
    genres: string[];
  }

  interface Review {
    reviewSummary: string;
    reviewText: string;
    reviewRating: number;
  }

  interface Album {
    name: string;
    images: string[];
    base64Image: string | undefined;
  }

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        const response = await fetch(
          `api/lastfm?artist=${artist?.name}&album=${album?.name}`
        );
        const data = await response.json();
        if (data.album && data.album.tags) {
          const tagNames = data.album.tags.tag.map((tag: any) => tag.name);
          const matchingGenres = genres.filter((genre) =>
            tagNames.includes(genre)
          );
          if (artist) setArtist({ ...artist, genres: matchingGenres });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (artist && album) {
      fetchAlbumInfo();
    }
  }, [album]);

  const handleSetArtist = (artist: Artist | undefined) => {
    setArtist(artist);
  };

  const handleSetAlbum = (album: Album | undefined) => {
    setAlbum(album);
  };

  const handleSetReview = (review: Review | undefined) => {
    setReview(review);
  };

  /*   const handleSelectedRating = (rating: string) => {
    setSelectedRating(rating);
  };

  const handleReviewSummaryChange = (newSummary: string) => {
    setReviewSummary(newSummary);
  };

  const handleReviewTextChange = (newText: string) => {
    setReviewText(newText);
  }; */

  const handleSubmitReview = () => {
    console.log("submit review");
  };

  console.log(artist);

  return (
    <Container>
      <div className="text-2xl text-center mt-6 text-white ">
        Submit a Review
      </div>
      {artist && album && (
        <>
          <div className="text-xl mx-auto mt-6 p-2 text-white max-w-[700px]">
            {artist.name} - {album.name}
          </div>
          <Separator className="max-w-[700px] mx-auto bg-[#a7a7a7]" />
        </>
      )}

      <div className="w-full max-w-[700px] mx-auto mt-6 mb-6 md:-96 rounded-md flex flex-col md:flex-row">
        <div className=" mx-auto mb-6 lg:mb-0 lg:max-w-2xl w-full md:w-1/2 lg:mr-6">
          <ArtistSelect onArtistSelect={handleSetArtist} />
          {artist && (
            <div>
              {/*    <AlbumSelect
                artistName={artist.name}
                onAlbumSelect={handleSetAlbum}
              />
                  <ReviewRating onRatingSelect={handleSelectedRating} />  */}
            </div>
          )}
        </div>
        <div className="w-full max-w-md mx-auto lg:max-w-2xl lg:w-1/2">
          {album && (
            <div className="w-full rounded-sm flex items-start justify-center">
              <Image
                src={album.images[3]}
                alt="Album cover"
                placeholder="blur"
                blurDataURL={base64Img}
                width={300}
                height={300}
                className="rounded-sm ease-in transition mt-4"
              />
            </div>
          )}
        </div>
      </div>

      {artist && album && (
        <div className="w-full max-w-[700px] mx-auto mb-6">
          {/*           <ReviewSummary onReviewSummaryChange={handleReviewSummaryChange} />
          <ReviewText onReviewTextChange={handleReviewTextChange} /> */}
          <Button>Submit review</Button>
        </div>
      )}
    </Container>
  );
};

export default SubmitReview;
