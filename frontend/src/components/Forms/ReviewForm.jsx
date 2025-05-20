import { useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const userdata = useSelector((state) => state.auth.user); 
  const [rating, setRating] = useState(0);
  const [fullReview, setFullReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  console.log(userdata.user.id);
  console.log(productId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userdata) {
      setError("Please login to submit a review");
      return;
    }
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (!fullReview.trim()) {
      setError("Please write a review");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/v1/review", {
        user_id: userdata.user.id,
        product_id: productId,
        rating,
        full_review: fullReview,
      });

      if (response.data) {
        setRating(0);
        setFullReview("");
        if (onReviewSubmitted) {
          onReviewSubmitted(response.data.review);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  size={24}
                  className={
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Review
          </label>
          <textarea
            id="review"
            rows={4}
            value={fullReview}
            onChange={(e) => setFullReview(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience with this product..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm; 