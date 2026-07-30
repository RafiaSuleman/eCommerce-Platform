"use client";

import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/productCard";
interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  categoryName: string;
  image: string;
}

// useEffect jb b change ho ya automaticlly run ho jata ha useEffect
const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    async function searchProducts() {
      if (!debouncedQuery) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(`/api/search?query=${debouncedQuery}`);

        const data: Product[] = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    searchProducts();
  }, [debouncedQuery]);
  console.log("data", products);
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Search Products</h1>

      <p className="mt-2 text-gray-500">
        Find your favorite products instantly.
      </p>

      <div className="mt-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border border-gray-300 px-5 py-3 text-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {loading && (
          <p className="mt-8 text-center text-blue-600 font-semibold">
            Searching...
          </p>
        )}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
            >
                <ProductCard
                              key={product._id}
                              name={product.name}
                              image={product.image}
                              price={product.price}
                              slug={product.slug}
                              categoryName={product.categoryName}
                            />
              {/* <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="h-56 w-full rounded-xl object-cover"
              />
              <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
              <p className="mt-2 text-blue-600 font-bold">${product.price}</p> */}
            </div>
          ))}
        </div>
        {query && products.length === 0 && (
          <p className="mt-10 text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
