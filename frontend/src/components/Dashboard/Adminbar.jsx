import React from 'react'
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

function Adminbar() {
   return (
     <div className="h-screen w-64 bg-[#212322] text-white flex flex-col p-5">
       <h2 className="text-2xl font-semibold font-[inter] ml-4  mb-6 mt-3">
         UNIK
       </h2>
       <nav className="flex flex-col space-y-2">
         <NavLink
           to="/dashboard"
           className="flex items-center p-3 hover:bg-gray-200 hover:text-black rounded-lg"
         >
           <FaHome className="mr-2 text-2xl" /> Dashboard
         </NavLink>
         <NavLink
           to="/dashboard/orders"
           className="flex items-center p-3 hover:bg-gray-200 hover:text-black rounded-lg"
         >
           <FaShoppingCart className="mr-2 text-2xl" /> Orders
         </NavLink>
         <NavLink
           to="/dashboard/customers"
           className="flex items-center p-3 hover:bg-gray-200  hover:text-black rounded-lg"
         >
           <FaUsers className="mr-2 text-2xl" /> Customers
         </NavLink>
         <NavLink
           to="/dashboard/reviews"
           className="flex items-center p-3 hover:bg-gray-200 hover:text-black rounded-lg"
         >
           <FaChartBar className="mr-2 text-2xl" /> Reviews
         </NavLink>
         <NavLink
           to="/dashboard/settings"
           className="flex items-center p-3 hover:bg-gray-200 hover:text-black rounded-lg"
         >
           <FaCog className="mr-2 text-2xl" /> Settings
         </NavLink>
       </nav>
     </div>
   );
}

export default Adminbar
