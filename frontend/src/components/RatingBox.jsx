import React from "react";
const SentimentBar = ({ label, value }) => {
  const isPositive = value >= 0;
  const percentage = Math.abs(value) * 50; // max 50% in either direction from center

  return (
    <div className="mb-6">
      <div className="mb-2 h-10  text-sm font-semibold text-gray-800">{label}</div>
      <div className="relative h-4 rounded-full bg-gray-100 border border-gray-300 overflow-hidden shadow-inner">
        {/* Positive Fill */}
        {isPositive && (
          <div
            className="absolute top-0 h bottom-0 bg-yellow-500 transition-all duration-300"
            style={{
              left: "50%",
              width: `${percentage}%`,
            }}
          ></div>
        )}

        {/* Negative Fill */}
        {!isPositive && (
          <div
            className="absolute top-0 bottom-0 bg-indigo-500 transition-all duration-300"
            style={{
              right: "50%",
              width: `${percentage}%`,
            }}
          ></div>
        )}

        {/* Labels */}
        <div className="absolute inset-0 flex justify-between text-xs px-2 text-gray-500  font-medium">
          <span>-1</span>
          <span>0</span>
          <span>+1</span>
        </div>
      </div>
    </div>
  );
};


const RatingBox = ({ sizeValue, comfortValue }) => {
  return (
    <div className="p-4  rounded-xl  bg-white w-120 h-30">
      <div>
            <SentimentBar label="Size" value={sizeValue} />
      </div>
  
      {/* <SentimentBar label="Comfortability" value={comfortValue} /> */}
    </div>
  );
};

export default RatingBox;
