"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface ReviewTextProps {
  onReviewTextChange: (newSummary: string) => void;
}

const ReviewText: React.FC<ReviewTextProps> = ({ onReviewTextChange }) => {
  const handleReviewTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newText = event.target.value;

    onReviewTextChange(newText);
  };
  return (
    <div className="mt-2">
      <Label>Review Text</Label>
      <Textarea
        rows={15}
        onChange={handleReviewTextChange}
        placeholder="Write your review here"
        className="resize-y"
      />
    </div>
  );
};

export default ReviewText;
