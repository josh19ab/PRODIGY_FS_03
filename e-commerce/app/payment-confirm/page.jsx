import React from 'react';

function PaymentConfirm() {
  return (
    <div className="flex items-center justify-center mt-20 bg-gray-50">
      <div className=" shadow-lg rounded-lg p-8 max-w-md w-full text-center transform transition-transform duration-500 hover:scale-105 bg-white">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          A confirmation email has been sent to your registered email address.
        </p>
        <a
          href="/"
          className="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-300"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default PaymentConfirm;
