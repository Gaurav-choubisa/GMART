import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";


const Header = () => {


const [ isMobile ] =  useMobile()
const location = useLocation()
const isSearchpage = location.pathname === "/search"
console.log(location)
console.log(isMobile)

  return (
    <header className="h-24 flex lg:h-20 lg:shadow-md sticky top-0 bg-white z-50 flex-col justify-center gap-1">
      {
        !(isSearchpage && isMobile) && (
           <div className="container mx-auto flex items-center  px-2 justify-between">
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
        <div className="hidden lg:block">
          <Search />
        </div>

        {/* Login and Cart */}
        <div className="">
          <button className="text-neutral-600 lg:hidden">
            <FaCircleUser size={26}/>
          </button>
        <div className="hidden lg:block ">
          login and cart
        </div>
        </div>
      </div>
        )
      }

        <div className="container mx-auto px-2 lg:hidden">
          <Search />
        </div>
    </header>
  );
};

export default Header;
