import React from 'react'

function Card3({quantity , name , cost ,  main_image_link }) {
  return (
    <div className="h-[69px] w-[416px] bg-gray-100 p-3 flex mb-1 ">
    <img src={main_image_link} alt="" className="h-18 w-18 rounded mr-4" />
  

      <h1 className="text-md mr-40 mt-2 ">{name}</h1>
      <h1 className="text-gray-500 mt-5">₹{cost}</h1>
    <div className="rounded-full bg-black  text-white text-center mt-5 ml-5  top-0 h-6 w-8 ">
        <p>{quantity}</p>
      </div>
    </div>
  );
}

export default Card3
