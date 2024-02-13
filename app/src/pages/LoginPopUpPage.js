import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";

const LoginPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    const hasPopupBeenShown = localStorage.getItem("hasPopupBeenShown");

    if (!hasPopupBeenShown && !user) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [user]);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem("hasPopupBeenShown", "true");
  };

  return (
    showPopup && (
      <div className="popup">
        <div
          id="toast-interactive"
          className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="flex">
            <div className="ms-3 text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                Log In please
              </span>
              <div className="mb-2 text-sm font-normal mt-2">
                You need to log in to access features
              </div>
              <div className="grid grid-cols-2 gap-2 mt-10">
                <div>
                  <Link
                    to="/login"
                    className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    Log In
                  </Link>
                </div>
                <div>
                  <Link
                    to="/signup"
                    className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 "
              data-dismiss-target="#toast-interactive"
              onClick={() => closePopup()}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginPopup;
