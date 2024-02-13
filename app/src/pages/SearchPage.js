import React from "react";

import NavBar from "../features/navbar/Navbar";
import { useSelector } from "react-redux";
import "../index.css";
import { selectSearchedProduct } from "../features/product/productListSlice";
import { Link } from "react-router-dom";
import ProductCard from "../features/product/components/ProductCard";

const SearchPage = () => {
  const searchProducts = useSelector(selectSearchedProduct);
  return (
    <>
      <NavBar>
        <div className="bg-white h-screen">
          <div>
            <h2 className="text-center text-2xl pt-3 tracking-wider text-pretty">
              {searchProducts?.length} results found
            </h2>
          </div>
          <div className="mt-6 grid ml-8 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8 animation_product">
            {searchProducts &&
              searchProducts.map((product) => (
                <Link to={`/product-detail/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
          </div>
        </div>
      </NavBar>
    </>
  );
};

export default SearchPage;
