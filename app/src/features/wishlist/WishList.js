import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import "../../index.css";

import {
  deleteItemFromWishlistAsync,
  selectWishlistItems,
} from "./wishListSlice";

function WishList() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleRemove = (itemId) => {
    dispatch(deleteItemFromWishlistAsync(itemId));
  };

  return (
    <>
      <div>
        <h2 className="text-center text-2xl mt-2 tracking-wider text-pretty">
          Your WishList
        </h2>
        <h2 className="text-center mt-10 text-xl tracking-wider text-pretty">
          {wishlistItems.length === 0 ? "No Product found" : ""}
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 animation_product">
        {wishlistItems.length > 0 &&
          wishlistItems.map((product) => (
            <>
              <div className="p-2 border-black-100 m-3 bg-white overflow-hidden  shadow-md border rounded-sm h-67">
                <div key={product.product.id} className="group relative">
                  <Link to={`/product-detail/${product.product.id}`}>
                    <div className="aspect-h-1 aspect-w-1  w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                      <img
                        src={product.product.images[0]}
                        alt={product.product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                  </Link>

                  <Link
                    to={`/product-detail/${product.product.id}`}
                    className="mt-4"
                  >
                    <div className="p-4  flex justify-between">
                      <h2 className="mb-2 text-lg font-medium text-gray-900">
                        {product.product.title} by {product.product.brand}
                      </h2>

                      <div className="">
                        <p className="mr-2 text-lg font-semibold text-gray-900 ">
                          ${product.product.price}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <>
                    <div className="text-end">
                      <button
                        onClick={() => handleRemove(product.id)}
                        type="button"
                        className="font-medium text-red-400 hover:text-red-500"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export default WishList;
