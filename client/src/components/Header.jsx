import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-20 shadow-md sticky top-0 bg-white z-50">
      <div className="container mx-auto flex items-center h-full px-2 justify-between">
        {/* Logo */}
        <Link to={"/"} className="h-full flex justify-center items-center">
          <img
            src={logo}
            width={170}
            height={60}
            alt="logo"
            className="hidden lg:block"
          />
          <img
            src={logo}
            width={120}
            height={60}
            alt="logo"
            className="lg:hidden"
          />
        </Link>

        {/* Search */}
        <div>
          <Search />
        </div>

        {/* Login and Cart */}
        <div className="flex items-center space-x-4">
          <button className="text-blue-600 font-medium">Login</button>
          <button className="relative">
            <span className="material-icons">shopping_cart</span>
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">0</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
