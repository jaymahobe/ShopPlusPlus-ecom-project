import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyCart from "../../assets/cartEmpty2png.png";
import { Link } from "react-router-dom";
import "../../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteItemfromCartAsync } from "./cartSlice";
import { selectCartItems, updateQuantityAsync } from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const totalAmt = cartItems
    ? cartItems.reduce(
        (amt, item) => item.product.price * item.quantity + amt,
        0
      )
    : 0;

  const totalItem =
    cartItems && Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => item.quantity + total, 0)
      : 0;

  // handle remove from cart
  const handleRemove = (itemId) => {
    toast.info("Deleted", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(deleteItemfromCartAsync(itemId));
  };

  // handle cart quantity
  const handleQuantity = (event, product) => {
    dispatch(
      updateQuantityAsync({
        id: product.id,
        quantity: +event.target.value,
      })
    );
  };

  return (
    <>
      <div className="mx-auto shadow-md bg-white max-w-3xl px-4 py-2 mt-5 sm:px-6 lg:px-8">
        <ToastContainer />
        <h2 className="text-center text-2xl tracking-wider text-pretty">
          Your Cart
        </h2>
        <div className="mt-8 cart-container p-3 form-container">
          {!cartItems.length ? (
            <div className="flex justify-center h-full items-center text-2xl tracking-wider text-pretty">
              <div className="w-48">
                <img src={EmptyCart} alt="emptyCart" />
                <div className="text-sm text-red-500 mt-1 ml-5">
                  waiting to be filled...
                </div>
              </div>
            </div>
          ) : (
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 shadow-md flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.product.images[0]}
                        alt={product.product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/product-detail/${product.product.id}`}>
                              {product.product.title}
                            </Link>
                            <p className="mt-1 text-sm text-gray-500">
                              By {product.product.brand}
                            </p>
                          </h3>
                          <p className="ml-4">${product.product.price}</p>
                        </div>
                        <p className="text-sm text-slate-400 pb-1">
                          variant:{product.model}
                        </p>
                      </div>
                      <div className="flex flex-1 justify-between items-baseline text-sm">
                        <div className="text-gray-500">
                          <div className="inline mr-2 text-gray-500">Qty</div>
                          <div className="inline ">
                            <select
                              value={product.quantity}
                              onChange={(e) => handleQuantity(e, product)}
                              className="rounded-md py-1"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>

                        <div className="block">
                          <div>
                            <div className="text-end">
                              <button
                                onClick={() => handleRemove(product.id)}
                                type="button"
                                className="font-medium text-red-400 hover:text-red-500"
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-2">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Amount</p>
            <p>${totalAmt}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p className="text-sm text-gray-500">Inclusive Taxes</p>
            <p>{totalItem} Items</p>
          </div>

          <button className="w-full mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </button>

          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link
                to="/"
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
