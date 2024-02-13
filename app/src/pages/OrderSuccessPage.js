import React, { useEffect } from "react";
import successful from "../assets/successfull.png";
import { Link, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetOrder } from "../features/order/orderSlice";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectLoggedInUserInfo } from "../features/user/userSlice";

const OrderSuccessPage = () => {
  const user = useSelector(selectLoggedInUserInfo);
  const params = useParams();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(resetCartAsync(user.id));

  //   dispatch(resetOrder());
  // }, [dispatch, user]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            {/* put a logo here */}
            <p className="mt-4 sm:text-xl/relaxed">Hurray!!!</p>
            <h1 className="text-3xl font-extrabold sm:text-5xl text-green-600">
              Order Placed
            </h1>
            <p className="mt-2 sm:text-xl/relaxed text-green-600">
              Thank you!!!
            </p>
            <img
              className="h-16 w-16 m-3 rounded-full inline-block"
              src={successful}
              alt="successful"
            />
            <p className="sm:text-xl/relaxed">Order#{params?.id}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 ">
              <Link
                className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
                to="/"
              >
                continue Shopping
              </Link>

              <Link
                to="/my-order"
                className="block w-full border cursor-pointer rounded px-12 py-3 text-sm font-medium text-black shadow hover:text-green-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              >
                Orders Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccessPage;
