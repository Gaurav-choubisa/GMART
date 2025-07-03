import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";



const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, SetISSearchPage] = useState(false);


  useEffect(() => {
    const isSearch = location.pathname === "/search";
    SetISSearchPage(isSearch);
  }, [location]);


  const redirectToSearchPage = () => {
    navigate("/search");

  };


  console.log("search", isSearchPage);



  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-full border overflow-hidden flex items-center  text-neutral-400 bg-slate-50">
      <button className="flex justify-center items-center h-full p-3">
        <IoSearch size={22} />
      </button>
      <div>
        {
            !isSearchPage ? (
                      <div onClick={redirectToSearchPage}>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Search "milk"',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Search "bread"',
            1000,
            'Search "vegetables"',
            1000,
            'Search "panner"',
            1000,
            'Search "chips"',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Search "biscuits"',
            1000,
            'Search "fruits"',
            1000,
            'Search "cheese"',
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
            ): (
                <div className="w-full">
                    <input
                    type="text"
                    placeholder="search for aata, daal and more">
                    </input>
                </div>
            )
        }
      </div>

    </div>
  );
};

export default Search;
