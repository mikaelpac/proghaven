"use client";

import React, { useState } from "react";
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

interface ReviewRatingProps {
  onRatingSelect: (rating: string) => void;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({ onRatingSelect }) => {
  const [selectedRating, setSelectedRating] = useState<string | undefined>(
    undefined
  );

  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
    onRatingSelect(rating);
  };

  return (
    <div className="mt-2">
      <Label>Select Review Score</Label>
      <Select onValueChange={onRatingSelect}>
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
  );
};

export default ReviewRating;
