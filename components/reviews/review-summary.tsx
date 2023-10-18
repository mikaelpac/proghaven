"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface ReviewSummaryProps {
  onReviewSummaryChange: (newSummary: string) => void;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  onReviewSummaryChange,
}) => {
  const handleReviewSummaryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newSummary = event.target.value;

    onReviewSummaryChange(newSummary);
  };
  return (
    <div>
      <Label>Review summary</Label>
      <Textarea
        className="resize-none"
        onChange={handleReviewSummaryChange}
        rows={3}
        minLength={10}
        maxLength={300}
        placeholder="Write your summary here"
      />
    </div>
  );
};

export default ReviewSummary;
