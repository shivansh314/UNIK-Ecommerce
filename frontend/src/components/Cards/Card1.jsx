import React from "react";

function Card1({image , cost , name}) {
  return (
    <div className="flex flex-col h-full ">
      <div className="w-[421px] h-[590px] flex items-center justify-center overflow-hidden ">
        <img
          src={image}
          alt=""
          className="object-center object-fit  transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="w-[421px] h-[69px] mt-5">
        <h1 className="text-[20px] font-semibold leading-[18px] font-[inter]">
          {name}
        </h1>
        <p className="text-gray-600 font-[inter] mt-1">Recycled Wool</p>
        <p className="font-[inter] ">₹{cost}</p>
      </div>
    </div>
  );
}

export default Card1;
