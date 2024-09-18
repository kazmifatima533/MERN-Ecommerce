import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="Trendify" />
      <h1 className="text-3xl font-semibold text-gray-700">Admin Dashboard</h1>
      <button className="px-5 py-2 text-xs text-white bg-gray-600 rounded-full sm:px-7 sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
