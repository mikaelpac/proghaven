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
  onSubmitReview: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmitReview }) => {
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [reviewSummary, setReviewSummary] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");

  console.log(rating);
  console.log(reviewSummary);
  console.log(reviewText);

  return (
    <div>
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
        <Button onClick={onSubmitReview}>Submit review</Button>
      </div>
    </div>
  );
};

export default ReviewForm;
