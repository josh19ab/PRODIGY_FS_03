import React from "react";
import OrderTracking from "./_components/OrderTracking";

function orders() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
        <div className="text-dark  font-bold text-[24px] flex justify-around ">
          <h2>Your Orders</h2>
        </div>
        <div >
          <OrderTracking />
        </div>
      </div>
    </section>
  );
}

export default orders;
