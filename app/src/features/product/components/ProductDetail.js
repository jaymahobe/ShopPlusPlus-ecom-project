import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import {
  selectProductById,
  fetchProductByIdAsync,
  updateProductAsync,
} from "../productListSlice";
import { Link, useParams } from "react-router-dom";
import "../../../index.css";
import { selectLoggedInUser } from "../../auth/authSlice";
import { addToCartAsync, selectCartItems } from "../../cart/cartSlice";
import {
  addToWishListAsync,
  selectWishlistItems,
} from "../../wishlist/wishListSlice";
import { selectLoggedInUserInfo } from "../../user/userSlice";
import { useForm } from "react-hook-form";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedModel, setSelectedModel] = useState("");
  const cartItem = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const dispatch = useDispatch();
  const params = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewPosted, setReviewPosted] = useState(false);
  const product = useSelector(selectProductById);

  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectLoggedInUserInfo);

  const handleAddToCart = (e) => {
    // handle the add to cart fn here
    e.preventDefault();
    if (cartItem.findIndex((item) => item.product.id === product.id) < 0) {
      dispatch(
        addToCartAsync({
          ...product,
          product: product.id,
          model: selectedModel || "128gb",
          quantity: 1,
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
      toast.warn("Already in cart!", {
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
  const handleAddToWishlist = (e) => {
    e.preventDefault();

    if (wishlistItems.findIndex((item) => item.product.id === product.id) < 0) {
      dispatch(
        addToWishListAsync({
          ...product,
          product: product.id,
          quantity: 1,
          user: user.id,
        })
      );
      toast.success("Added to Wishlist", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn("Already in wishlist!", {
        position: "bottom-right",
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

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white ">
      <ToastContainer />
      {product ? (
        <div className="pt-6 animation_product">
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.images[3]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                $ {product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating + 0.5
                            ? "text-yellow-500"
                            : "text-slate-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <Link className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {product.rating} out of 5 (
                    {product.reviews && product.reviews.length} Reviews)
                  </Link>
                </div>
              </div>

              <form className="mt-10">
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      Select model
                    </h3>
                  </div>

                  <RadioGroup
                    value={selectedModel}
                    onChange={setSelectedModel}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.model &&
                        product.model.map((model) => (
                          <RadioGroup.Option
                            key={model.name}
                            value={model}
                            disabled={!product.stock}
                            className={({ active }) =>
                              classNames(
                                product.stock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "ring-2 ring-indigo-500" : "",
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {model}
                                </RadioGroup.Label>
                                {product.stock ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-indigo-500"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                    </div>
                  </RadioGroup>
                </div>
                {/* buttons */}

                <div>
                  {user ? (
                    <div>
                      <div className="flex justify-center">
                        <button
                          onClick={handleAddToCart}
                          type="submit"
                          className="mt-10 mr-2 flex  items-center justify-center rounded-md bg-yellow-400  px-8 py-3 text-base font-medium  text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <AddShoppingCartIcon />
                          Add to cart
                        </button>
                        <button
                          onClick={handleAddToWishlist}
                          type="submit"
                          className="mt-10 mr-2 flex  items-center justify-center rounded-md border-2 bg-white  px-3 py-1 text-base font-medium text-red-500 hover:text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <FavoriteBorderIcon />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* for not logged in user */}
                      <div className="flex justify-center">
                        <Link
                          to="/login"
                          className="mt-10 mr-2 flex  items-center justify-center rounded-md bg-yellow-400  px-8 py-3 text-base font-medium  text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <div className="pr-3">
                            <AddShoppingCartIcon />
                          </div>
                          Add to cart
                        </Link>
                        <Link
                          to="/login"
                          className="mt-10 mr-2 flex  items-center justify-center rounded-md border-2 bg-white  px-3 py-1 text-base font-medium text-red-500 hover:text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <FavoriteBorderIcon />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <div className="mt-4"></div>
              </div>
              {/* reviews section */}
              <div className="text-center mt-6  pt-3">
                <p>Customer Reviews</p>
              </div>
              {product.reviews.length === 0 ? (
                <div className="rounded-md flex border-2 p-3 justify-center">
                  no reviews
                </div>
              ) : (
                <div className="containerStyle rounded-md shadow-lg grid grid-cols-2">
                  {product.reviews &&
                    product.reviews.map((review, index) => (
                      <div className="p-3 " key={index}>
                        <figure className="rounded-2xl bg-white p-6 border border-yellow-300 shadow-lg ring-1 ring-gray-900/5">
                          <blockquote className="text-gray-900">
                            <p>{review.review}</p>

                            <div className="flex align-baseline mt-1 text-yellow-400">
                              <StarRateIcon />
                              {review.rating}
                            </div>
                          </blockquote>
                          <figcaption className="mt-6 flex items-center gap-x-4">
                            <div>
                              <div className="font-semibold">
                                - {review.user.name}
                              </div>
                            </div>
                          </figcaption>
                        </figure>
                      </div>
                    ))}
                </div>
              )}

              {user && (
                <form
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    const { review } = data;
                    const post = {
                      user: { name: userInfo.name, email: userInfo.email },
                      review: review,
                      rating: selectedRating,
                    };
                    if (product.id === params.id) {
                      dispatch(
                        updateProductAsync(
                          {
                            ...product,
                            reviews: [...product.reviews, post],
                          },
                          fetchProductByIdAsync(params.id)
                        )
                      );

                      toast.success("Review posted thank you!", {
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      setReviewPosted(true);
                      reset();
                    } else {
                      toast.error("Sorry There is some issue", {
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    }
                  })}
                >
                  <div className="max-w-2xl mx-auto mt-10">
                    <label
                      htmlFor="reviews"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Review product
                    </label>
                    <textarea
                      id="reviews"
                      rows={4}
                      {...register("review", {
                        required: "Review is required",
                      })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your review..."
                      defaultValue={""}
                    />
                  </div>

                  <div className="flex items-baseline mt-3 ml-4 space-x-5">
                    <div className="ml-8">
                      <button className="px-3 py-1 shadow-lg shadow-gray-500/50 bg-black text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]">
                        Post
                      </button>
                    </div>
                    <div className="flex items-baseline ">
                      <div className="flex items-center">
                        <p className="mr-2">Ratings</p>
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            values={rating + 1}
                            className={classNames(
                              selectedRating !== null
                                ? selectedRating > rating + 0.5
                                  ? " text-yellow-500"
                                  : "hover:text-yellow-500 text-slate-200"
                                : "text-slate-200",
                              "h-5 w-5 flex-shrink-0 cursor-pointer transition-colors duration-200"
                            )}
                            aria-hidden="true"
                            onClick={() => {
                              setSelectedRating(rating + 1);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
