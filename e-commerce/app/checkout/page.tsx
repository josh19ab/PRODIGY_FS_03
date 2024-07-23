'use client'

import { Elements } from "@stripe/react-stripe-js";
import { useCheckout } from "../_context/CheckoutContext";
import CheckoutForm from "./_components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY as string);

const Checkout: React.FC = () => {
  const { totalAmount } = useCheckout();

  console.log("total amount",totalAmount);
  

  if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
    return <div className="text-red-500">Invalid amount specified.</div>;
  }

  const options = {
    mode: "payment" as const,
    currency: "usd",
    amount: totalAmount * 100, // Convert to cents
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={totalAmount} />
    </Elements>
  );
};

export default Checkout;
