import { PencilIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrderForAdminAsync,
  selectAllOrderForAdmin,
  updateOrderAsync,
} from "../../order/orderSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrderForAdmin);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  useEffect(() => {
    dispatch(fetchAllOrderForAdminAsync());
  }, [dispatch]);

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8 ">
        <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-0 text-left cursor-pointer">
                      Order#
                    </th>
                    <th className="py-3 px-0 text-left">Items</th>
                    <th className="py-3 px-0 text-left cursor-pointer"></th>
                    <th className="py-3 px-0 text-center">Shipping Address</th>
                    <th className="py-3 px-0 text-center">Order Status</th>
                    <th className="py-3 px-0 text-center">Payment Method</th>

                    <th className="py-3 px-0 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-0 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">
                            Order#
                            <div className="text-[0.7rem]">{order.id}</div>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-left">
                        {/* Display items in the order */}
                        {order.cartItems.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="mr-2">
                              {/* <img
                                className="w-[200px] rounded-full"
                                src={item.product.images[0]}
                                alt=""
                              /> */}
                            </div>
                            <span>
                              {item.product.title} - {item.quantity} x{" "}
                              {item.product.price}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center text-red-500">
                          {order.totalAmt} totalAmt
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        {/* Display shipping address */}
                        <div>
                          <div>
                            <strong>{order.selectAddress.name}</strong>,
                          </div>
                          <div>{order.selectAddress.street},</div>
                          <div>
                            {order.selectAddress.city},
                            {order.selectAddress.state}
                            {order.selectAddress.pinCode}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            className="p-2 rounded-md"
                            onChange={(e) => handleOrderStatus(e, order)}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-0 text-center text-red-400 font-semibold">
                        {order.paymentMethod}
                      </td>
                      <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                        <PencilIcon
                          className="w-6 mt-5 h-6"
                          onClick={(e) => handleEdit(order)}
                        ></PencilIcon>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
