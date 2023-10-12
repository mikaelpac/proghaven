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
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Review Scores</SelectLabel>
            {reviewScores.map((score) => (
              <SelectItem value={score} key={score}>
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
