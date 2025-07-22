import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, SetISSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    SetISSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };


  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-10 lg:h-12 rounded-full border overflow-hidden flex items-center  text-neutral-400 bg-slate-50 focus-within:border-primary-200 group">
      <div>
        {/*  */}
        {
          (isMobile && isSearchPage) ? (  <Link to={"/"} className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
          <FaArrowLeft size={22}/>
        </Link>) : (
            <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
          <IoSearch size={22} />
        </button>
        )
        }
     
      </div>
      <div className="w-full">
        {!isSearchPage ? (
          <div onClick={redirectToSearchPage}>
            <TypeAnimation
              sequence={[
                'search "milk"',
                1000, 
                'search "bread"',
                1000,
                'search "vegetables"',
                1000,
                'search "panner"',
                1000,
                'search "chips"',
                1000,
                'search "biscuits"',
                1000,
                'search "fruits"',
                1000,
                'search "cheese"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="search for aata, daal and more"
              autoFocus={true}
              className="bg-transparent w-full h-full outline-none"
            ></input>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
