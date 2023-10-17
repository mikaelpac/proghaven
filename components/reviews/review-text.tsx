"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const ReviewText = () => {
  return (
    <div className="mt-2">
      <Label>Review Text</Label>
      <Textarea
        rows={15}
        placeholder="Write your review here"
        className="resize-y"
      />
    </div>
  );
};

export default ReviewText;
