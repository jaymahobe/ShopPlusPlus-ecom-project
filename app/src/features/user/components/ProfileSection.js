import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../../auth/authSlice";
import { selectLoggedInUserInfo } from "../userSlice";

const ProfileSection = () => {
  const userInfo = useSelector(selectLoggedInUserInfo);
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleUserEdit = () => {
    setOpenForm(true);
    setValue("name", userInfo.name);
    setValue("email", userInfo.email);
    setValue("phone", userInfo.phone);
  };
  return (
    <>
      <div className="form-container">
        <div className="h-screen sm:w-full flex justify-center">
          <div className="lg:w-3/5 md:w-1/2 sm:w-full">
            <form
              className="bg-white p-10 rounded-lg shadow-lg min-w-full"
              onSubmit={handleSubmit((data) => {
                const user = {
                  ...userInfo,
                  name: data.name,
                  email: data.email,
                  phone: data.phone,
                };
                setOpenForm(false);
                dispatch(updateUserAsync(user));
              })}
            >
              <div className="text-end">
                <button
                  onClick={handleUserEdit}
                  type="button"
                  className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  Edit
                </button>
              </div>
              <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
                Personal Information
              </h1>
              <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-pink-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                rewards : 0
              </div>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-3 text-md"
                  htmlFor="name"
                >
                  Username
                </label>
                {!openForm ? (
                  <div className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <div className="ml-3">{userInfo.name}</div>
                  </div>
                ) : (
                  <input
                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    {...register("name", {
                      required: "required",
                    })}
                    id="name"
                  />
                )}
              </div>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-3 text-md"
                  htmlFor="email"
                >
                  Email Address
                </label>
                {!openForm ? (
                  <div className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <div className="ml-3"> {userInfo.email}</div>
                  </div>
                ) : (
                  <input
                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    {...register("email", {
                      required: "required",
                    })}
                    id="email"
                  />
                )}
              </div>

              <div>
                <label
                  className="text-gray-800 font-semibold block my-3 text-md"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                {!openForm ? (
                  <div className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <div className="ml-3">
                      {userInfo.phone || "Register your phone number"}
                    </div>
                  </div>
                ) : (
                  <input
                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("phone", {
                      required: "required",
                    })}
                    id="phone"
                  />
                )}
              </div>
              {openForm ? (
                <div className="text-end">
                  <button
                    onClick={() => setOpenForm(false)}
                    type="button"
                    className="relative -ml-px mr-7 inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-12 min-w-[8rem] rounded-lg border-2 mt-3 border-emerald-600 bg-emerald-500 text-emerald-50 shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600"
                  >
                    Save
                  </button>
                </div>
              ) : null}

              <div className="mt-7 border-t-2">
                <div className="col-span-12 lg:col-start-4 lg:col-span-6">
                  <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-inherit mt-6 mb-1 font-semibold !text-black">
                    FAQs What happens when I update my email address (or mobile
                    number)?
                  </h5>
                  <div className="block antialiased font-sans text-base leading-relaxed mb-4 font-normal text-gray-600">
                    Your login email id (or mobile number) changes, likewise.
                    You'll receive all your account related communication on
                    your updated email address (or mobile number). When will my
                    ShopPlus+ account be updated with the new email address (or
                    mobile number)? It happens as soon as you confirm the
                    verification code sent to your email (or mobile) and save
                    the changes. What happens to my existing ShopPlus+ account
                    when I update my email address (or mobile number)? Updating
                    your email address (or mobile number) doesn't invalidate
                    your account. Your account remains fully functional. You'll
                    continue seeing your Order history, saved information and
                    personal details. Does my Seller account get affected when I
                    update my email address? ShopPlus+ has a 'single sign-on'
                    policy. Any changes will reflect in your Seller account
                    also.
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
