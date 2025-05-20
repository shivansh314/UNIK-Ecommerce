import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
;

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star,
  TrendingUp,
} from "lucide-react";



const recentReviews = [
  {
    id: 1,
    user: "Sarah J.",
    rating: 5,
    sentiment: 0.92,
    date: "2025-04-02",
    text: "Absolutely love this product. It exceeds all my expectations and the quality is outstanding.",
  },
  {
    id: 2,
    user: "Mike T.",
    rating: 2,
    sentiment: -0.45,
    date: "2025-04-01",
    text: "Disappointing quality for the price. Had issues with durability after just two weeks of use.",
  },
  {
    id: 3,
    user: "Alex K.",
    rating: 4,
    sentiment: 0.67,
    date: "2025-03-30",
    text: "Great product overall. Would have given 5 stars but shipping took longer than expected.",
  },
  {
    id: 4,
    user: "Rachel M.",
    rating: 5,
    sentiment: 0.88,
    date: "2025-03-28",
    text: "Fantastic! Exactly what I needed and arrived quickly. Will definitely purchase again.",
  },
];

// Helper function to get sentiment class
const getSentimentClass = (score) => {
  if (score >= 0.6) return "text-green-500";
  if (score >= 0.3) return "text-green-400";
  if (score > -0.3) return "text-gray-500";
  if (score > -0.6) return "text-red-400";
  return "text-red-500";
};

// Helper function to render stars
const RatingStars = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

// Main dashboard component
export default function Check() {
  const [activeTab, setActiveTab] = useState("overview");

  const [reviewData, setreviewdata] = useState([]);
  const [recentReviews , setrecentreviews] = useState([]);

  const fetchReviewData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/review/getallreview"
      );

      setreviewdata(res.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(()=>{
    fetchReviewData();

  },[])

  useEffect(() => {
    if (reviewData.length) {
      const sorted = [...reviewData].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      const latest = sorted.slice(0, 6); // get 5-6 most recent
      console.log(latest);

      setrecentreviews(latest);
    }
  }, [reviewData]);

  const [recentReviewsByProduct, setRecentReviewsByProduct] = useState({});

  useEffect(() => {
    if (reviewData.length) {
      const sorted = [...reviewData].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      const latest = sorted.slice(0, 30); // increase slice if needed

      // Group by product_id
      const grouped = latest.reduce((acc, review) => {
        const { product_id } = review;
        if (!acc[product_id]) acc[product_id] = [];
        if (acc[product_id].length < 5) acc[product_id].push(review); // up to 5 reviews per product
        return acc;
      }, {});

      setRecentReviewsByProduct(grouped);
    }
  }, [reviewData]);

  


  // Calculate metrics
  // Total number of reviews
  const totalReviews = reviewData.length;
  console.log(totalReviews);
  

  // Average Rating
  const avgRating = (
    reviewData.reduce((sum, item) => sum + item.rating, 0) / totalReviews
  ).toFixed(1);

  // Average Sentiment Score
  const avgSentiment = (
    reviewData.reduce((sum, item) => sum + item.sentiment_score, 0) /
    totalReviews
  ).toFixed(2);

  // Sentiment breakdown
  const sentimentBreakdown = {
    positive: reviewData.filter((item) => item.sentiment_score > 0.6).length,
    neutral: reviewData.filter(
      (item) => item.sentiment_score >= 0.4 && item.sentiment_score <= 0.6
    ).length,
    negative: reviewData.filter((item) => item.sentiment_score < 0.4).length,
  };

  // Positive percentage
  const positivePercentage = (
    (sentimentBreakdown.positive /
      (sentimentBreakdown.positive +
        sentimentBreakdown.neutral +
        sentimentBreakdown.negative)) *
    100
  ).toFixed(0);

  const sentimentBreakdownData = [
    { name: "Positive", value: sentimentBreakdown.positive, color: "#4CAF50" },
    { name: "Neutral", value: sentimentBreakdown.neutral, color: "#FFC107" },
    { name: "Negative", value: sentimentBreakdown.negative, color: "#F44336" },
  ];

  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: reviewData.filter((review) => review.rating === rating).length,
  }));

  const reviewDataByMonth = Object.values(
    reviewData.reduce((acc, review) => {
      const month = dayjs(review.created_at).format("MMM YYYY"); // e.g., "Apr 2025"
      if (!acc[month]) {
        acc[month] = { month, count: 0, totalSentiment: 0 };
      }
      acc[month].count += 1;
      acc[month].totalSentiment += review.sentiment_score;
      return acc;
    }, {})
  ).map((item) => ({
    ...item,
    avgSentiment: item.totalSentiment / item.count,
  }));

  // Tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-2 text-blue-600 mb-1">
                  <MessageSquare size={20} />
                  <span className="font-medium">Total Reviews</span>
                </div>
                <div className="text-2xl font-bold">{totalReviews}</div>
                <div className="text-sm text-gray-500">Last 6 months</div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-2 text-yellow-500 mb-1">
                  <Star size={20} className="fill-yellow-500" />
                  <span className="font-medium">Average Rating</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">{avgRating}</span>
                  <RatingStars rating={avgRating} />
                </div>
                <div className="text-sm text-gray-500">Out of 5</div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-2 text-green-500 mb-1">
                  <ThumbsUp size={20} />
                  <span className="font-medium">Sentiment Score</span>
                </div>
                <div
                  className={`text-2xl font-bold ${getSentimentClass(
                    parseFloat(avgSentiment)
                  )}`}
                >
                  {avgSentiment}
                </div>
                <div className="text-sm text-gray-500">Range: -1 to 1</div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-2 text-green-600 mb-1">
                  <TrendingUp size={20} />
                  <span className="font-medium">Positive Reviews</span>
                </div>
                <div className="text-2xl font-bold">{positivePercentage}%</div>
                <div className="text-sm text-gray-500">Of total reviews</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Review Trend Chart */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Review Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={reviewDataByMonth}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgSentiment"
                      stroke="#10b981"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Rating Distribution */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">
                  Rating Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ratingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#6366f1" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Sentiment Breakdown */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">
                  Sentiment Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentBreakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {sentimentBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Recent Reviews</h3>
                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {recentReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm text-gray-500">
                          {review.full_review}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <RatingStars rating={review.rating} />
                        <span
                          className={`text-sm ${getSentimentClass(
                            review.sentiment_score
                          )}`}
                        >
                          {review.sentiment_score > 0.4 ? (
                            <ThumbsUp size={14} className="inline mb-1" />
                          ) : review.sentiment_score < 0.4 ? (
                            <ThumbsDown size={14} className="inline mb-1" />
                          ) : null}
                          {` ${review.sentiment_score.toFixed(2)}`}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="bg-[#F3F4F6] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">All Reviews</h2>
            {/* Detailed reviews would be here */}
            {Object.entries(recentReviewsByProduct).map(
              ([productId, reviews]) => (
                <div
                  key={productId}
                  className="bg-white rounded-lg shadow p-4 mb-6"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Product ID: {productId}
                  </h3>
                  <div className="space-y-4 max-h-72 overflow-y-auto">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b pb-4 last:border-0"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium">{review.user}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <RatingStars rating={review.rating} />
                          <span
                            className={`text-sm ${getSentimentClass(
                              review.sentiment_score
                            )}`}
                          >
                            {review.sentiment_score > 0.4 ? (
                              <ThumbsUp size={14} className="inline mb-1" />
                            ) : review.sentiment_score < 0.4 ? (
                              <ThumbsDown size={14} className="inline mb-1" />
                            ) : null}
                            {review.sentiment_score !== undefined
                              ? ` ${review.sentiment_score.toFixed(2)}`
                              : ""}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{review.full_review}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        );
      case "analytics":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Advanced Analytics</h2>
            {/* Advanced analytics would be here */}
            <p className="text-gray-500">
              Advanced analytics view would be shown here...
            </p>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Seller Review Dashboard
          </h1>
       
   
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 ${
                activeTab === "reviews"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 px-1 ${
                activeTab === "analytics"
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Advanced Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
