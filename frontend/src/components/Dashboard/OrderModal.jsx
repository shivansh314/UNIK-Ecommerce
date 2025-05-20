import React, { useEffect, useState } from 'react'
import { Loader, X } from "lucide-react";
import axios from "axios";

function OrderModal({ isOpen, setIsOpen, order_id }) {

    const [data , setData ] = useState({})
    console.log(order_id);
    
    
    const fetchOrderdetails = async (params) => {
       try {
         const response = await axios.get(
           `http://localhost:8000/api/v1/order/details/${order_id}` 
         );

         // Assuming you're handling the response data here
         setData(response.data)
       } catch (error) {
         console.error("Error fetching order details:", error);
       }
    }

    useEffect(() => {
      if (isOpen) {
        fetchOrderdetails();
      }
    }, [isOpen]);
    
  return (
    <div>
         {isOpen && (
        <div
          className="fixed right-200 inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-5/12  bg-white z-40 shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`}
        style={{ marginRight: 0 }}
      >
        {/* Close Button */}
        <button
          className="absolute top-12 right-10 text-black"
          onClick={() => setIsOpen(false)}
        >
          <X size={38} />
        </button>

        {/* Cart Title */}
        <div className="flex justify-center p-12">
          <h2 className="text-5xl font-semibold font-[inter] mb-4">Order Details</h2>
        </div>
        </div>

    </div>
  );
}

export default OrderModal;
