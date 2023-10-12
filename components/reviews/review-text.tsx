"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const ReviewText = () => {
  return (
    <div>
      <Label>Review Text</Label>
      <Textarea placeholder="Write your review here" />
    </div>
  );
};

export default ReviewText;
