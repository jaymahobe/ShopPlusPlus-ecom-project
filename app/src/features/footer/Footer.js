import React from "react";
import BrandLogo from "../../assets/logo.webp";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const Footer = () => {
  return (
    <>
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4 ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex">
              <img
                className="h-8 w-auto mr-1"
                src={BrandLogo}
                alt="Your Company"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                ShopPLus+
              </span>
            </div>

            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li href="#">
                <Link
                  to="/about"
                  className="hover:underline me-4 md:me-6"
                  onClick={() => scrollToTop()}
                >
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              ShopPlus+
            </a>
            . All Rights Reserved. Made with love by Jay Mahobe
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
