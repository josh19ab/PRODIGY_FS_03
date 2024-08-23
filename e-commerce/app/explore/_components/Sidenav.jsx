import { IndianRupee } from "lucide-react";
import { useState } from "react";
import { useEffect, useRef } from "react";

const Sidenav = ({
  isOpen,
  onClose,
  setSortOption,
  setFilterCategory,
  setSelectedCategories,
  selectedCategories,
  handleCategoryChange,
  minPrice,
  setMinPrice,
  setMaxPrice,
  maxPrice,
  handlePriceFilter,
  selectedAvailability,
  setSelectedAvailability,
  handleAvailabilityChange,
  setFilteredList,
  productList
}) => {
  const sidenavRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={sidenavRef}
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={onClose} className="p-4 text-gray-600">
          Close
        </button>

        <div className="p-4">
          <h3 className="text-lg ">Sort By</h3>

          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1.5 w-[170px] rounded-md text-gray-800 sm:text-sm p-2 border-none outline-none "
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="titleASC">a - z</option>
            <option value="titleDESC">z - a</option>
            <option value="priceASC">low to high</option>
            <option value="priceDESC">high to low</option>
          </select>
        </div>

        <div>
          <h3 className="p-4 text-lg">Filters</h3>

          <div className="mt-1 space-y-2">
            <details className="overflow-hidden rounded  border-b border-gray-200 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium"> Category </span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className=" bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700">
                    {" "}
                    {selectedCategories.length} Selected{" "}
                  </span>

                  <button
                    type="button"
                    className="text-sm text-gray-900 "
                    onClick={() => setSelectedCategories([])}
                  >
                    Reset
                  </button>
                </header>

                <ul className="space-y-1  p-4">
                  {["sneakers", "boots", "flip-flops", "tshirts"].map(
                    (category) => (
                      <li key={category}>
                        <label
                          htmlFor={`Filter${category}`}
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id={`Filter${category}`}
                            className="size-5 rounded border-gray-300"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </span>
                        </label>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </details>

            <details className="overflow-hidden rounded  border-b  border-gray-200 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium"> Price </span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className=" bg-white">
                
                <div className=" p-4">
                  <div className="flex justify-between gap-4">
                    <label
                      htmlFor="FilterPriceFrom"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">
                        <IndianRupee className="w-4 h-4" />
                      </span>
                      <input
                        type="number"
                        id="FilterPriceFrom"
                        placeholder="From"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      />
                    </label>

                    <label
                      htmlFor="FilterPriceTo"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">
                        <IndianRupee className="w-4 h-4" />
                      </span>
                      <input
                        type="number"
                        id="FilterPriceTo"
                        placeholder="To"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      />
                    </label>
                  </div>
                  <div className="flex justify-between mr-3">
                    <button
                      type="button"
                      onClick={handlePriceFilter}
                      className="mt-4 rounded-md bg-darkPrimary text-white px-4 py-2"
                    >
                      Apply Filter
                    </button>
                    <button
                      type="button"
                      className="text-sm text-gray-900"
                      onClick={() => {
                        setMinPrice("");
                        setMaxPrice("");
                        setFilteredList(productList);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </details>

            <details className="overflow-hidden rounded  border-b border-gray-200 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium"> Available </span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className=" bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700">
                    {" "}
                    {selectedAvailability.length} Selected{" "}
                  </span>

                  <button
                    type="button"
                    className="text-sm text-gray-900 "
                    onClick={() => setSelectedAvailability([])}
                  >
                    Reset
                  </button>
                </header>

                <ul className="space-y-1  p-4 dark:text-dark">
                  {["instantDelivery"].map((category) => (
                    <li key={category}>
                      <label
                        htmlFor={`Filter${category}`}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id={`Filter${category}`}
                          className="size-5 rounded border-gray-300"
                          checked={selectedAvailability.includes(category)}
                          onChange={() => handleAvailabilityChange(category)}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
