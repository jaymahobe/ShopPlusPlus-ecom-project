import React from "react";
// import Order from "../features/order/Order";
import NavBar from "../features/navbar/Navbar";
import UserOrder from "../features/user/components/UserOrder";

const OrderPage = () => {
  return (
    <>
      <NavBar>
        <UserOrder />
      </NavBar>
    </>
  );
};

export default OrderPage;
