import React, { useEffect } from "react";
import { fetchCartItems  } from "../../store/CartSlice.js";
import { useDispatch , useSelector } from "react-redux";
import axios from "axios";

function CartCard({ id, name, color, size, quantity , cost, main_image_link }) {
  const userdata = useSelector((state) => state.auth.user); 

  const dispatch = useDispatch();
  const removeCart =  async() => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/cart/delete/${id}`);
      dispatch(fetchCartItems(userdata.user.id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  




  return (
    <div className="h-44 w-full border-y-1 border-gray-300 flex  p-0">
      <img src={main_image_link} alt="" className="h-full w-52 object-cover " />
      <div className="w-44 h-full flex flex-col p-2 pl-12 pt-9">
        <h1 className="font-[inter] text-xl mb-1  "> {name}</h1>
        <h3 className="text-gray-500 text-md">{color}</h3>
        <h3 className="text-gray-500 text-md ">Size: {size}</h3>
      </div>
      <div className="flex gap-2 pl-18 pr-12 mr-2 ">
        <div className="p-5 border border-gray-300 h-5 w-5 flex items-center justify-center mt-16">
          {quantity}
        </div> 
      </div>
      <h1 className="font-[inter] text-3xl mt-16 pl-10 mr-5 ">₹{cost}</h1>
      <div className="relative h-full w-30 flex items-center justify-center group overflow-hidden">
        {/* Background effect on hover */}
        <div className="absolute inset-0 bg-[#212322] transition-transform duration-300 ease-in-out translate-x-full group-hover:translate-x-0"></div>

        {/* Text (keeps it above the background) */}

        <button
          className=  "w-full h-full z-10 text-gray-500 font-sans text-xl group-hover:text-white transition-colors duration-300 cursor-none"
          onClick={removeCart}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default CartCard;
