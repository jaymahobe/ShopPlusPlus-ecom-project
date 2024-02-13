import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import AdminHomePage from "./pages/adminPages/AdminHomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AllproductPage from "./pages/AllproductPage";
import AboutPage from "./pages/AboutPage";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  checkJwtAuthAsync,
  selectCheckedAuth,
  selectLoggedInUser,
} from "./features/auth/authSlice";
import { fetchCartItemsByUserIdAsync } from "./features/cart/cartSlice";
import OrderPage from "./pages/OrderPage";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserProfilePage from "./pages/UserProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminProductListPage from "./pages/adminPages/AdminProductListPage";
import AdminAddProductFormPage from "./pages/adminPages/AdminAddProductFormPage";
import AdminOrdersPage from "./pages/adminPages/AdminOrdersPage";
import { fetchLoggedInUserOrderAsync } from "./features/user/userSlice";
import { fetchLoggedInUserInfoAsync } from "./features/user/userSlice";
import LogOut from "./features/auth/components/LogOut";
import WishListPage from "./pages/WishListPage";
import { fetchWishlistByUserIdAsync } from "./features/wishlist/wishListSlice";
import SearchPage from "./pages/SearchPage";
import PaymentGateway from "./pages/PaymentGateway";
import { fetchProductForHomePageAsync } from "./features/product/productListSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomePage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedAdmin>
        <AdminProductListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/add-product",
    element: (
      <ProtectedAdmin>
        <AdminAddProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/add-product/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminAddProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/my-cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/all-products",
    element: <AllproductPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/my-order",
    element: (
      <Protected>
        <OrderPage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/order-successful/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: "/my-wishlist",
    element: (
      <Protected>
        <WishListPage />
      </Protected>
    ),
  },
  {
    path: "/search",
    element: <SearchPage></SearchPage>,
  },
  {
    path: "/payment-gateway/",
    element: (
      <Protected>
        <PaymentGateway></PaymentGateway>
      </Protected>
    ),
  },
  {
    path: "/user-logout",
    element: <LogOut></LogOut>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const checkAuth = useSelector(selectCheckedAuth);
  /* The code block you provided is using the `useEffect` hook to handle the fetching of cart items
 based on the user's ID. */
  //handling cart items by userId
  useEffect(() => {
    dispatch(checkJwtAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductForHomePageAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsByUserIdAsync(user.id)); //user cart items
      dispatch(fetchWishlistByUserIdAsync(user.id)); //user wishlist
      dispatch(fetchLoggedInUserInfoAsync(user.id)); // user for all info
      dispatch(fetchLoggedInUserOrderAsync(user.id)); //user order by id
    }
  }, [dispatch, user]);

  return <div>{checkAuth && <RouterProvider router={router} />}</div>;
}

export default App;
