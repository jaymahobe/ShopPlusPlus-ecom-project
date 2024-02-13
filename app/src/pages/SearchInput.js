import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProductAsync } from "../features/product/productListSlice";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vibrating, setVibrating] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword) {
      navigate("/search");
      dispatch(searchProductAsync(keyword));
    } else {
      setVibrating(true);
    }
  };
  setTimeout(() => {
    setVibrating(false);
  }, 500);

  return (
    <>
      <form onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-800 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-800 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            required=""
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700  border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <SearchRoundedIcon />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchInput;
