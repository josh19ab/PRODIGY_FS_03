"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../_components/Breadcrumb";
import { usePathname } from "next/navigation";
import ProductSection from "../_components/ProductSection";
import { ArrowRight, IndianRupee } from "lucide-react";
import SkeletalProductList from "../_components/SkeletalProductsList";
import ProductList from "../_components/ProductList";
import GlobalApi from "../_utils/GlobalApi";
import ProductItem from "../_components/ProductItem";
import LoadingEffect from "../_components/LoadingEffect";

function explore() {
  const path = usePathname();
  const [productList, setProductList] = useState([]);
  const [sneakerList, setSneakerList] = useState([]);
  const [outfitList, setOutfitList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("titleASC");
  const [filterCategory, setFilterCategory] = useState("");   
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = async () => {
    try {
      const resp = await GlobalApi.getLatestProducts();
      const data = resp.data.data;
      setProductList(data);
      setFilteredList(data);
      const sneakers = data.filter(
        (item) => item.attributes.category === "sneakers"
      );

      const outfits = data.filter(
        (item) => item.attributes.category === "tshirts"
      );
      setSneakerList(sneakers);
      setOutfitList(outfits);
    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  useEffect(() => {
    let updatedList = [...productList];
    if (filterCategory) {
      updatedList = updatedList.filter(
        (item) => item.attributes.category === filterCategory
      );
    }

    updatedList.sort((a, b) => {
      if (sortOption === "titleASC") {
        return a.attributes.title.localeCompare(b.attributes.title);
      } else if (sortOption === "titleDESC") {
        return b.attributes.title.localeCompare(a.attributes.title);
      } else if (sortOption === "priceASC") {
        return a.attributes.pricing - b.attributes.pricing;
      } else if (sortOption === "priceDESC") {
        return b.attributes.pricing - a.attributes.pricing;
      }
      return 0;
    });

    setFilteredList(updatedList);
  }, [sortOption, filterCategory, productList]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category); 
      } else {
        return [...prev, category]; 
      }
    });
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredList(productList); 
    } else {
      const updatedList = productList.filter((item) =>
        selectedCategories.includes(item.attributes.category)
      );
      setFilteredList(updatedList);
    }
  }, [selectedCategories, productList]);

  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability((prev) => {
      if (prev.includes(availability)) {
        return prev.filter((a) => a !== availability); 
      } else {
        return [...prev, availability]; 
      }
    });
  };

  useEffect(() => {
    let updatedList = [...productList];

    if (selectedAvailability.length > 0) {
      updatedList = updatedList.filter((item) =>
        selectedAvailability.includes("instantDelivery")
          ? item.attributes.instantDelivery
          : !item.attributes.instantDelivery
      );
    }

    setFilteredList(updatedList);
  }, [selectedAvailability, productList]);

  const handlePriceFilter = () => {
    let updatedList = [...productList];

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) && !isNaN(max)) {
      updatedList = updatedList.filter((item) => {
        const price = item.attributes.pricing;
        return price >= min && price <= max;
      });
    } else if (!isNaN(min)) {
      updatedList = updatedList.filter((item) => item.attributes.price >= min);
    } else if (!isNaN(max)) {
      updatedList = updatedList.filter((item) => item.attributes.price <= max);
    }

    setFilteredList(updatedList);
  };

  return (
    <section className=" bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Breadcrumb path={path} />
        <header>
          <h2 className="text-xl  font-bold text-gray-900 sm:text-3xl mt-10">
            Product Collection
          </h2>

          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <div className="mt-8 block lg:hidden">
          <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Filters & Sorting </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="hidden space-y-4 lg:block">
            <div className="py-2">
              <label
                htmlFor="HeadlineAct"
                className="block text-sm font-medium text-gray-900 "
              >
                {" "}
                Sort By{" "}
              </label>

              <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="mt-1.5 w-[170px] rounded-md border-gray-300 text-gray-800 sm:text-sm p-2"
                onChange={handleSortChange}
              >
                <option value="">Select</option>
                <option value="titleASC">a - z</option>
                <option value="titleDESC">z - a</option>
                <option value="priceASC">low to high</option>
                <option value="priceDESC">high to low</option>
                
              </select>
            </div>

            <div>
              <p className="block text-xs font-medium text-gray-700">Filters</p>

              <div className="mt-1 space-y-2">
                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
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

                  <div className="border-t border-gray-200 bg-white">
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

                    <ul className="space-y-1 border-t border-gray-200 p-4">
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

                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
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

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {minPrice && maxPrice
                          ? `${minPrice}  -  ${maxPrice}`
                          : "0 - 0"}
                      </span>
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
                    </header>

                    <div className="border-t border-gray-200 p-4">
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
                      <button
                        type="button"
                        onClick={handlePriceFilter}
                        className="mt-4 rounded-md bg-darkPrimary text-white px-4 py-2"
                      >
                        Apply Filter
                      </button>
                    </div>
                  </div>
                </details>

                <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
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

                  <div className="border-t border-gray-200 bg-white">
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

                    <ul className="space-y-1 border-t border-gray-200 p-4 dark:text-dark">
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
                              onChange={() =>
                                handleAvailabilityChange(category)
                              }
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
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

          <div className="lg:col-span-3">
            {isLoading ? (
              <div>
                <LoadingEffect />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                {filteredList.map((item, index) => (
                  <ProductItem key={index} product={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default explore;
