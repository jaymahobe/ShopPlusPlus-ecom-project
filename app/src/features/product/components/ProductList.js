import React, { useEffect } from "react";
import "../../../index.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useSelector, useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  selectAllProducts,
  fetchAllproductsAsync,
  selectIsLoading,
} from "../productListSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addToCartAsync, selectCartItems } from "../../cart/cartSlice";
import { selectLoggedInUserInfo } from "../../user/userSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductList() {
  const cartItem = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserInfo);
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchAllproductsAsync());
  }, [dispatch]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();

    if (cartItem.findIndex((item) => item.product.id === product.id) < 0) {
      dispatch(
        addToCartAsync({
          ...product,
          product: product.id,
          quantity: 1,
          model: "128gb",
          user: user.id,
        })
      );
      toast.success("Added to cart", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn("Already Added!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
          <ToastContainer />
          <div className="mt-6 grid grid-cols-1  gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 animation_product">
            {products.map((product) => (
              <Link to={`/product-detail/${product.id}`}>
                {status === "loading" ? (
                  <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="px-6 py-4">
                      <div className="h-6 bg-gray-300 mb-2"></div>
                      <div className="h-4 bg-gray-300 w-2/3"></div>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 w-1/2"></div>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 border-black-100 transform overflow-hidden duration-300 hover:scale-105 shadow-md border rounded-sm h-67">
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1  w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between items-baseline">
                        <div>
                          <p className="text-sm text-gray-700 font-bold">
                            <a href={product.href}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 "
                              />
                              {product.title}
                            </a>
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <div className="text-md font-bold text-gray-900 ">
                          ${product.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <div className="flex">
                        <StarRateIcon />
                        {product.rating}
                      </div>
                      {user ? (
                        <div>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="p-2 rounded-md border-2 px-4 duration-300 hover:bg-green-500"
                          >
                            <AddShoppingCartIcon />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
