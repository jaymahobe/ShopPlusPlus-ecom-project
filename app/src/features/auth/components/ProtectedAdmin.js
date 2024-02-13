import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

import { selectLoggedInUser } from "../authSlice";
import { selectLoggedInUserInfo } from "../../user/userSlice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUserInfo);
  const LoggedUser = useSelector(selectLoggedInUser);

  if (!LoggedUser) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return <>{children}</>;
};

export default ProtectedAdmin;
