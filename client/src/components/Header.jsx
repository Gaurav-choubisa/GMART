import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchpage = location.pathname === "/search";
  const navigate = useNavigate();
  const redirectToLoginPage = () => {
    navigate("/login");
  };
  return (
    <header className="h-24 flex lg:h-20 lg:shadow-md sticky top-0 bg-white z-50 flex-col justify-center gap-1">
      {!(isSearchpage && isMobile) && (
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
          {/* this part musst be visible in mobile version only */}
          <div className="">
            <button className="text-neutral-600 lg:hidden">
              <FaCircleUser size={26} />
            </button>
            {/* this part musst be visible in desktop version only */}
            <div className="hidden lg:flex gap-10 items-center">
              <button className="text-lg px-2" onClick={redirectToLoginPage}>
                Login
              </button>
              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white">
                <div className="animate-bounce">
                  {/*add to cart icon  */}
                  <TiShoppingCart size={26} />
                </div>

                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
