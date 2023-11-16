"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
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
import { reviewScores } from "@/utils/constants";
import { Button } from "../ui/button";

interface ReviewFormProps {
  artist: Artist;
  album: Album;
}

interface Artist {
  name: string;
  genres: string[];
}

interface Album {
  name: string;
  images: string[];
  base64Image: string | undefined;
}

interface Review {
  rating: number;
  summary: string;
  text: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ artist, album }) => {
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [reviewSummary, setReviewSummary] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");

  const handleFormSubmit = async () => {
    if (!rating || !reviewSummary || !reviewText) {
      console.error("Incomplete review information");
      return;
    }
    console.log("Submit form");
    console.log(album);
    console.log(artist);
    console.log(rating);
    console.log(reviewSummary);
    console.log(reviewText);

    const review: Review = {
      rating: rating,
      summary: reviewSummary,
      text: reviewText,
    };

    // hey chatgpt try to call the Get artist by name thing here. artist name is in artist.name
    try {
      // Call the function to get artist information
      const artistData = await getArtistByName(artist.name);

      // Handle the artist data as needed
      console.log("Artist Data:", artistData);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  const getArtistByName = async (name: string): Promise<Artist | null> => {
    try {
      const response = await fetch(
        `/api/artist?name=${encodeURIComponent(name)}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch artist data. Status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching artist data:", error);
      return null;
    }
  };

  return (
    <div className="max-w-[700px] m-auto">
      <div>
        <Label>Review Text</Label>
        <Textarea
          rows={15}
          onChange={(e) => {
            setReviewText(e.target.value);
          }}
          placeholder="Write your review here"
          className="resize-y"
        />
      </div>
      <div className="mt-2">
        <Label>Review summary</Label>
        <Textarea
          className="resize-none"
          onChange={(e) => {
            setReviewSummary(e.target.value);
          }}
          rows={3}
          minLength={10}
          maxLength={300}
          placeholder="Write your summary here"
        />
      </div>
      <div className="mt-2">
        <Label>Select Review Score</Label>
        <Select
          onValueChange={(rating) => {
            setRating(Number(rating));
          }}
        >
          <SelectTrigger className="md:w-[300px] w-full bg-[#242424] text-white">
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent className="bg-[#242424]">
            <SelectGroup>
              {reviewScores.map((score) => (
                <SelectItem
                  value={score}
                  key={score}
                  className="bg-[#242424] text-[#A7A7A7] hover:bg-[#a7a7a7] hover:text-white"
                >
                  {score}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full max-w-[700px] mx-auto mb-6">
        <Button onClick={handleFormSubmit}>Submit review</Button>
      </div>
    </div>
  );
};

export default ReviewForm;
