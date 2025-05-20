import { Star } from "lucide-react";
import { useSelector } from "react-redux";

const ReviewCard = ({ review }) => {
  const userdata = useSelector((state) => state.auth.user);

  if (!review) return null;

  return (
    <div className="bg-[#FFFFFF] p-12 w-9/12 h-66 ml-50 mt-2 mb-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex gap-1 text-black mt-1 mb-4 align-middle justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < review.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
        <span className="text-gray-400 text-sm">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>

      <h4 className="font-medium text-gray-700 mt-3 font-[inter]">
        {review.summary}
      </h4>
      <p className="text-gray-500 mt-3 text-sm leading-relaxed mb-9 font-[inter]">
        {review.full_review}
      </p>
    </div>
  );
};

export default ReviewCard;
