"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
// import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function Checkout({ amount }) {
  // const searchParams = useSearchParams();

  if (!amount || isNaN(amount) || amount <= 0) {
    return <div className="text-red-500">Invalid amount specified.</div>;
  }

  const options = {
    mode: "payment",
    currency: "usd",
    amount: amount * 100,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}

export default Checkout;
