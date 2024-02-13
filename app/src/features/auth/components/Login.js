import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BrandLogo from "../../../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import "../../../index.css";
import { Spinner } from "flowbite-react";
import HomeIcon from "@mui/icons-material/Home";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";

import {
  selectLoggedInUser,
  selectLoggedInError,
  selectUserAuthStatus,
} from "../authSlice";
import { checkUserAsync } from "../authSlice";

import { useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const status = useSelector(selectUserAuthStatus);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  // selecting login errors
  const loggedInError = useSelector(selectLoggedInError);
  // selecting user
  const user = useSelector(selectLoggedInUser);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //handle navigate for close button
  const handleNavigateForCloseBtn = () => {
    navigate("/");
  };

  // for handle to navigate to prev page
  useEffect(() => {
    const handleNavigate = () => {
      navigate("/");
    };
    if (user) {
      handleNavigate();
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="w-full text-end">
            <button onClick={handleNavigateForCloseBtn}>
              <HomeIcon />
            </button>
          </div>
          <div className="flex justify-center">
            <img className="mr-2 h-10" src={BrandLogo} alt="Brand Logo" />
            <p className="mt-1 text-center mr-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              ShopPlus+
            </p>
          </div>

          <h2 className="mt-10 text-center text-xl font-base leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            method="POST"
            onSubmit={handleSubmit(async (data) => {
              dispatch(
                checkUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                })
              );

              clearErrors();
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email is Invalid",
                    },
                  })}
                  type="email"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* error for validation */}
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
                {/* error for auth check */}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 w-full inline-block relative">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-8"
                />
                <span
                  className="show-password-btn hover:bg-slate-100 rounded-lg"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>
              </div>
              <div>
                {loggedInError && status === "idle" && (
                  <p className="text-sm text-red-500 mt-1">
                    Invalid credentials / User not Found
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {status === "loading" ? <Spinner /> : <>Log In</>}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New to ShopPlus+?
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
