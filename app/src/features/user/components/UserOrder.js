import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserOrders } from "../userSlice";

import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/authSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  let reversedOrders = orders.slice().reverse();
  const loggedInUser = useSelector(selectLoggedInUser);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return " text-purple-600";
      case "dispatched":
        return " text-yellow-600";
      case "delivered":
        return " text-green-600";
      case "received":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return " text-purple-600";
    }
  };
  const chooseBarColor = (status) => {
    switch (status) {
      case "pending":
        return " bg-purple-600";
      case "dispatched":
        return " bg-yellow-600";
      case "delivered":
        return " bg-green-600";
      case "received":
        return "bg-green-600";
      case "cancelled":
        return "bg-red-600";
      default:
        return " bg-purple-600";
    }
  };
  const getProgressBarWidth = (status) => {
    switch (status) {
      case "pending":
        return 10;
      case "dispatched":
        return 40;
      case "delivered":
        return 100;
      case "received":
        return 100;
      case "cancelled":
        return 80;
      default:
        return 10;
    }
  };

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(loggedInUser.id));
  }, [dispatch, loggedInUser.id]);

  return (
    <div>
      {orders && (
        <div className="m-3">
          {orders?.length ? (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 sm:gap-1 lg:grid-cols-2 xl:gap-x-2 animation_product">
              {reversedOrders?.map((order) => (
                <div key={order.id} className="my-8">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden p-1">
                    <div className="px-6 py-4">
                      <div className="flex justify-between items-baseline">
                        <div className="text-sm text-gray-800 mb-1 ">
                          Order #{order.id}
                        </div>
                        <div className="text-sm ml-3  lg:text-xl  font-bold mb-1">
                          Order Status:
                          <span
                            className={`${chooseColor(
                              order.status
                            )} p-2  text-xs lg:text-xl`}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-3">
                        <div
                          className={`${chooseBarColor(
                            order.status
                          )} h-2.5  rounded-full`}
                          style={{
                            width: `${getProgressBarWidth(order.status)}%`,
                          }}
                        />
                      </div>

                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {order.cartItems.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <Link
                                to={`/product-detail/${item.product.id}`}
                                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                              >
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </Link>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <Link
                                        to={`/product-detail/${item.product.id}`}
                                      >
                                        {item.product.title}
                                      </Link>
                                    </h3>
                                    <p className="ml-4">
                                      ${item.product.price}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.product.brand}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="text-gray-500">
                                    <label
                                      htmlFor="quantity"
                                      className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Qty :{item.quantity}
                                    </label>
                                  </div>

                                  <div className="flex"></div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t border-gray-200">
                      Payment method: {order.paymentMethod}
                      <div className="flex justify-between my-2 text-lg font-semibold text-gray-900">
                        <p>Subtotal</p>
                        <p>${order.totalAmt}</p>
                      </div>
                      <div className="flex justify-between my-2 text-lg font-semibold text-gray-900">
                        <p>Total Items in ordered</p>
                        <p>{order.totalItem} items</p>
                      </div>
                      <div className="flex border-y-2 p-1  justify-between items-center mt-2">
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold text-gray-900">
                            {order.selectAddress.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {order.selectAddress.street}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            PinCode: {order.selectAddress.pinCode}
                          </p>
                        </div>

                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm font-semibold text-gray-900">
                            Phone: {order.selectAddress.phone}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.selectAddress.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-center text-2xl tracking-wider text-pretty">
              You Have't Order Something
            </h2>
          )}
        </div>
      )}
    </div>
  );
}
