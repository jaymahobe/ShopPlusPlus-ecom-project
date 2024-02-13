import React from "react";
import WishList from "../features/wishlist/WishList";
import NavBar from "../features/navbar/Navbar";

const WishListPage = () => {
  return (
    <>
      <NavBar>
        <WishList />
      </NavBar>
    </>
  );
};

export default WishListPage;
