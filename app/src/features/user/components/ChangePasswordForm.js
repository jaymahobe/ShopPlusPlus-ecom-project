import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordRequestAsync,
  selectChangePassError,
  selectChangePassStatus,
  selectUserAuthStatus,
} from "../../auth/authSlice";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import { selectLoggedInUserInfo } from "../userSlice";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectLoggedInUserInfo);
  const ChangeStatus = useSelector(selectChangePassStatus);
  const error = useSelector(selectChangePassError);
  const status = useSelector(selectUserAuthStatus);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <ToastContainer />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-3 form-container">
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit((data) => {
              const { password, newPassword } = data;
              const { email } = userInfo;
              const user = { email, password, newPassword };
              dispatch(changePasswordRequestAsync(user));
              reset();
            })}
          >
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Your Old password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Old password is required",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              {error && status === "idle" && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2 w-full inline-block relative">
                <input
                  id="newPassword"
                  {...register("newPassword", {
                    required: "New password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `At least 8 characters
                    - Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                    - Can contain special characters`,
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-8"
                />
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Re-Type New password
              </label>
              <div className="mt-2 w-full inline-block relative">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Retype your password",
                    validate: (value, formValues) =>
                      value === formValues.newPassword ||
                      "Password doesn't match",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-8"
                />
                <span className="show-password-btn hover:bg-slate-100 rounded-lg"></span>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {status === "loading" ? <Spinner /> : "Change Password "}
              </button>
              {ChangeStatus && (
                <div className="text-xl text-green-500 p-4 text-center">
                  Password changed successfully
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;
