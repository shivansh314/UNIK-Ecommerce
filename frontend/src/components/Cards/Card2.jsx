import React from 'react'

function Card2({image , name , material , cost}) {
  return (
    <div className="w-[334px] h-[462px] flex justify-center align-middle shadow-[0px_4px_10px_rgba(0,0,0,0.1)] bg-[#F7F6F3]">
      <div className="h-full w-auto">
        <div className="flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt=""
            className="object-cover object-center mb-5  transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>

        <div className="ml-3">
          <h1 className="text-[20px] font-bold leading-[18px] font-[inter]">
            {name}
          </h1>
          <p className="text-gray-600 font-[inter] mt-1.5">{material}</p>
          <p className="font-[inter] text-[16px] font-semibold mt-1">₹{cost}</p>
        </div>
      </div>
    </div>
  );
}

export default Card2
