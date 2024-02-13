import React from "react";
import Cart from "../features/cart/Cart";
import NavBar from "../features/navbar/Navbar";

const CartPage = () => {
  return (
    <>
      <NavBar>
        <Cart />
      </NavBar>
    </>
  );
};

export default CartPage;
