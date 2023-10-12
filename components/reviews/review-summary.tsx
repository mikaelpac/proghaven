"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const ReviewSummary = () => {
  return (
    <div>
      <Label>Review summary</Label>
      <Textarea placeholder="Type your review summary here. The summary should bring emphasize your review's main points." />
    </div>
  );
};

export default ReviewSummary;
