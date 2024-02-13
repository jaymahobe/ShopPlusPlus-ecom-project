import React from "react";
import UserProfile from "../features/user/components/UserProfile";
import NavBar from "../features/navbar/Navbar";

const UserProfilePage = () => {
  return (
    <>
      <NavBar>
        <UserProfile />
      </NavBar>
    </>
  );
};

export default UserProfilePage;
