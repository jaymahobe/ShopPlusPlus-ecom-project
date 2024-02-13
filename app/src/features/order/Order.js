import React from "react";
import { Link } from "react-router-dom";
import successful from "../../assets/successfull.png";
const orders = [
  {
    id: 1,
    name: 'Apple MacBook Pro 17"',
    address: "Tukrair para word 08, khairagarh 491881",
    status: "pending",
    date: "22/12/23",
  },

  // More products...
];
const Order = () => {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-2xl p-2 mb-5 tracking-wider text-pretty">
          Order History
        </h2>
        <h2 className="text-2xl font-bold mb-4 ml-4">Orders #5643</h2>
        <ul className="divide-y divide-gray-300">
          {orders?.map((order) => (
            <li key={order.id} className="py-2">
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap">
                  <div>
                    <img
                      className="h-16 m-3 inline-block"
                      src={successful}
                      alt="successful"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-semibold">{order.name}</p>
                    <p className="text-gray-600">Address: {order.address}</p>
                    <p className="text-gray-600">Date: {order.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold">
                    Status: {order.status}
                  </p>
                </div>
                <div>
                  <p className="text-green-600 font-semibold">
                    Status: {order.status}
                  </p>
                </div>
                <div>
                  <p className="text-green-600 font-semibold">
                    Status: {order.status}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Order;
