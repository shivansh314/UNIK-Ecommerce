import React from 'react'
import { Outlet } from "react-router-dom";
import Adminbar from "../components/Dashboard/Adminbar.jsx";

function Dashboard() {
  return (
    <div className="bg-[#212322] flex h-auto w-screen">
      <Adminbar />

      <div className="flex-1 rounded bg-white p-8 m-2">
        <Outlet />
      </div>
    </div>
  );
} 

export default Dashboard



