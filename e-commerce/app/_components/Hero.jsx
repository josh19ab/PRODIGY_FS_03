import React from "react";

function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-gray-900 ">
            E-Commerce website &nbsp;
            <strong className="font-extrabold text-primary sm:block">
              For a local store.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-darkPrimary px-12 py-3 text-sm font-medium text-white shadow   sm:w-auto hover:bg-darkAccent focus:outline-none focus:ring "
              href="#"
            >
              Buy Now
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
