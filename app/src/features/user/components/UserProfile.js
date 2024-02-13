import React, { useState } from "react";
import "../../../index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePasswordForm from "./ChangePasswordForm";
import AddressBook from "./AddressBook";
import ProfileSection from "./ProfileSection";
import { useSelector } from "react-redux";
import { selectLoggedInUserInfo } from "../userSlice";
const UserProfile = () => {
  const [formState, setFormState] = useState("none");
  const userInfo = useSelector(selectLoggedInUserInfo);

  let formComponents;

  const handleAddressForm = () => {
    setFormState("handleAddressForm");
  };

  const handleProfile = () => {
    setFormState("profileSection");
  };

  const handleChangeForm = () => {
    setFormState("changePassword");
  };

  switch (formState) {
    case "profileSection":
      formComponents = <ProfileSection />;
      break;
    case "changePassword":
      formComponents = <ChangePasswordForm />;
      break;
    case "handleAddressForm":
      formComponents = <AddressBook />;
      break;
    default:
      formComponents = <AddressBook />;
  }

  return (
    <div>
      <ToastContainer />
      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8 ">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            <div
              onClick={handleChangeForm}
              className={`shrink-0 border-b-2 border-transparent ${
                formState === "changePassword"
                  ? "text-sky-400 border-b-sky-400 hover:text-sky-600"
                  : "text-gray-500"
              } px-1 pb-4 text-sm font-medium text-gray-500 cursor-pointer  hover:border-gray-300 hover:text-sky-500`}
            >
              Change Password
            </div>

            <div
              onClick={handleAddressForm}
              className={`shrink-0 border-b-2 border-transparent hover:text-sky-500  cursor-pointer px-1 pb-4 text-sm font-medium ${
                formState === "handleAddressForm"
                  ? "text-sky-400 border-b-sky-400"
                  : "text-gray-500"
              } hover:border-gray-300 hover:text-gray-700`}
              aria-current="page"
            >
              Address Book
            </div>
            <div
              onClick={handleProfile}
              className={`shrink-0 border-b-2 border-transparent hover:text-sky-500 cursor-pointer px-1 pb-4 text-sm font-medium ${
                formState === "profileSection"
                  ? "text-sky-400 border-b-sky-400 hover:text-sky-600"
                  : "text-gray-500"
              } hover:border-gray-300 hover:text-sky-500`}
              aria-current="page"
            >
              Profile
            </div>
          </nav>
        </div>
      </div>

      {userInfo && formComponents}
    </div>
  );
};

export default UserProfile;
