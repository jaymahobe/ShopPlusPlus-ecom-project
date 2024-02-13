import React from "react";
import { useSelector } from "react-redux";
import { selectCartStatus } from "../../cart/cartSlice";
import "../../../index.css";
import { selectProductsForHome } from "../productListSlice";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

const settings = {
  dots: true,
  infinite: true,
  speed: 4000,
  adaptiveHeight: true,
  slidesToShow: 4,
  slidesToScroll: 3,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const HomeProductList = ({ brand }) => {
  const products = useSelector(selectProductsForHome);
  const status = useSelector(selectCartStatus);
  return (
    <>
      <div className="bg-grey mt-1 mb-20 ">
        <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
          <div className="text-2xl font-bold tracking-tight text-gray-900  text-center">
            <div className="mb-3"> {brand}</div>
          </div>
          <ToastContainer />
          <div className="mt-6 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
            <Slider {...settings}>
              {products
                .filter((product) => product.brand === brand)
                .map((product) => (
                  <Link to={`/product-detail/${product.id}`} key={product.id}>
                    {status === "loading" ? (
                      <Spinner />
                    ) : (
                      <div className="m-2 transform duration-150 hover:scale-105">
                        <ProductCard product={product} />
                      </div>
                    )}
                  </Link>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        backgroundColor: "black",
        borderRadius: "50%",
        padding: "6px 2px 3px 2px",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        backgroundColor: "black",
        borderRadius: "50%",
        padding: "6px 2px 3px 2px",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    />
  );
}

export default HomeProductList;
