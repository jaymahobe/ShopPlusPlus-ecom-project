import React, { useState } from "react";
import NavBar from "../features/navbar/Navbar";
import LandingPageBanner from "../assets/LandingPageBanner.mp4";
import Footer from "../features/footer/Footer";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "../index.css";
import LoginPopup from "./LoginPopUpPage";

import HomeProductList from "../features/product/components/HomeProductList";
import { Link } from "react-router-dom";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    if (window.scrollY > 120) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Attach the handleScroll function to the scroll event
  window.addEventListener("scroll", handleScroll);

  return (
    <div className="bg-white">
      <NavBar>
        <div>
          <div className="form-container">
            <div className="lg:h-screen overflow-hidden relative sm:h-auto md:h-auto">
              <video
                autoPlay
                muted
                className="absolute border-t-2 border-gray-800 shadow-xl"
              >
                <source src={LandingPageBanner} type="video/mp4" />
              </video>
              <div className="sm:relative md:p-10 lg:p-0 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
                <div className="col-span-6 text-center sm:text-left">
                  <span className="uppercase textsColor text-xs font-bold hidden sm:block mb-2  animated-text">
                    WE ARE EXPERTS
                  </span>
                  <h1 className="textsColor text-xs pt-3 font-extrabold lg:text-5xl sm:text-sm mb-8 animated-text">
                    Welcome to the world of flagship Phones
                  </h1>
                  <Link to="/all-products">
                    <button className="mt-8 animated-text p-1 mb-2 sm:text-base text-sm textsColor uppercase sm:py-4 font-light sm:px-10 border border-black hover:bg-white hover:bg-opacity-10">
                      EXPLORE
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <HomeProductList brand={"Apple"} />
          </div>
        </div>
        <HomeProductList brand={"Samsung"} />

        <div
          className={`floating-button ${isVisible ? "visible" : ""}`}
          onClick={scrollToTop}
        >
          {/* You can place your icon or text inside the button */}
          <span>
            <ArrowUpwardIcon />
          </span>
        </div>

        <Footer />
        <LoginPopup />
      </NavBar>
    </div>
  );
};

export default Home;
