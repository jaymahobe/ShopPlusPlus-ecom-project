import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutFrom";
import "../index.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";
const stripePromise = loadStripe(
  "pk_test_51Ob2e0SEtaLiIQNzVKhEygTPCYAQ8sf3swJIZRpcFbe4ELZVUubMUxE3g55Urrxi8QfDWNGChcKrJzi9pTvU4ZNs00REVDOGtM"
);

export default function PaymentGateway() {
  const [clientSecret, setClientSecret] = useState("");

  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmt: currentOrder.totalAmt,
        orderId: currentOrder.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe flex w-full h-full justify-center items-center mt-10">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
