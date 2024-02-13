import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logOutUserAsync, selectLoggedInUser } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";

const LogOut = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOutUserAsync());
  }, [dispatch]);
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
};

export default LogOut;
