"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { simplifiedProduct } from "@/app/interface";

interface CategoryProductsProps {
  products: simplifiedProduct[];
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  // Category, sorting ya search change ho to
  // visible products wapas 2 ho jayen
  useEffect(() => {
    setVisibleCount(2);
  }, [selectedCategory, sortOrder, searchQuery]);

  // Products se unique categories automatically nikalna
  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.categoryName)
          .filter(Boolean),
      ),
    ];
  }, [products]);

  // Sare filters reset karna
  const clearFilters = () => {
    setSelectedCategory("all");
    setSortOrder("default");
    setSearchQuery("");
    setVisibleCount(2);
  };

  // Search → Category Filter → Price Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let updatedProducts = [...products];

    // Search filter
    if (searchQuery.trim() !== "") {
      updatedProducts = updatedProducts.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.categoryName === selectedCategory,
      );
    }

    // Price: Low to High
    if (sortOrder === "low-to-high") {
      updatedProducts.sort(
        (a, b) => a.price - b.price,
      );
    }

    // Price: High to Low
    if (sortOrder === "high-to-low") {
      updatedProducts.sort(
        (a, b) => b.price - a.price,
      );
    }

    return updatedProducts;
  }, [
    products,
    searchQuery,
    selectedCategory,
    sortOrder,
  ]);

  // Sirf visible products show honge
  const visibleProducts =
    filteredAndSortedProducts.slice(
      0,
      visibleCount,
    );

  return (
    <>
      {/* Search + Category Filter + Price Sorting */}
      <div className="mx-10 mt-6 flex flex-wrap justify-end gap-4">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 sm:w-64"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {/* Price Sorting Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="default">
            Sort by: Default
          </option>

          <option value="low-to-high">
            Price: Low to High
          </option>

          <option value="high-to-low">
            Price: High to Low
          </option>
        </select>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="rounded-lg bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
        >
          Clear Filters
        </button>
      </div>

      {/* Product Count */}
      <p className="mx-10 mt-6 text-sm font-medium text-gray-600">
        {filteredAndSortedProducts.length}{" "}
        {filteredAndSortedProducts.length === 1
          ? "Product"
          : "Products"}{" "}
        Found
      </p>

      {/* Products */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="mx-10 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {visibleProducts.map((product) => (
            <div
              key={product._id}
              className="group relative"
            >
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link
                      href={`/product/${product.slug}`}
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>

                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-gray-500">
          No products found.
        </p>
      )}

      {/* Load More */}
      {visibleCount <
        filteredAndSortedProducts.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() =>
              setVisibleCount(
                (previousCount) =>
                  previousCount + 4,
              )
            }
            className="rounded-xl bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}