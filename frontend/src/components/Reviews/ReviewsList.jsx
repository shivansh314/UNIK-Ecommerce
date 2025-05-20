import { useState, useEffect } from "react";
import axios from "axios";
import ReviewCard from "../Cards/ReviewCard";
import ReviewForm from "../Forms/ReviewForm";

const ReviewsList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/review/product/${productId}?page=${page}&limit=5`
      );
      
      if (response.data.reviews.length < 5) {
        setHasMore(false);
      }
      
      setReviews((prev) => [...prev, ...response.data.reviews]);
      setLoading(false);
    } catch (err) {
      setError("Failed to load reviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, page]);

  const handleReviewSubmitted = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (loading && page === 1) {
    return <div className="text-center py-4">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <ReviewForm
        productId={productId}
        onReviewSubmitted={handleReviewSubmitted}
      />

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Load More Reviews
          </button>
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <p className="text-center text-gray-500">No reviews yet</p>
      )}
    </div>
  );
};

export default ReviewsList; 