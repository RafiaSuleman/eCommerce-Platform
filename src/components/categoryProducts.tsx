"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { simplifiedProduct } from "@/app/interface";
import { Search, X } from "lucide-react";
interface CategoryProductsProps {
  products: simplifiedProduct[];
}

export default function CategoryProducts({ products }: CategoryProductsProps) {

  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map((product) => product.categoryName).filter(Boolean),
      ),
    ];
  }, [products]);

  // Sare filters reset karna
  const clearFilters = () => {
    setSelectedCategory("all");
    setSortOrder("default");
    setSearchQuery("");
  };

  // Search → Category Filter → Price Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let updatedProducts = [...products];

    // Search filter
    if (searchQuery.trim() !== "") {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.categoryName === selectedCategory,
      );
    }

    // Price: Low to High
    if (sortOrder === "low-to-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    // Price: High to Low
    if (sortOrder === "high-to-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    return updatedProducts;
  }, [products, searchQuery, selectedCategory, sortOrder]);

  // Sirf visible products show honge
 

  return (
    <>
      {/* Search + Category Filter + Price Sorting */}
      <div className="mx-10 mt-6 flex flex-wrap justify-end gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          {/* Search Icon */}
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 outline-none focus:border-blue-500"
          />

          {/* Clear Search Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Price Sorting Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="default">Sort by: Default</option>

          <option value="low-to-high">Price: Low to High</option>

          <option value="high-to-low">Price: High to Low</option>
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
        {filteredAndSortedProducts.length === 1 ? "Product" : "Products"} Found
      </p>

      {/* Products */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="mx-10 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product._id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
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
              <Link
                  href={`/product/${product.slug}`}
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
                >
                  View Product
                </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-16 text-center sm:mx-10">
          <Search className="mb-4 h-12 w-12 text-gray-400" />

          <h3 className="text-xl font-semibold text-gray-800">
            No products found
          </h3>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white transition hover:bg-gray-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
