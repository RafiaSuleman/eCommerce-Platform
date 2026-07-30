"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setSuggestions([]);
      return;
    }
    fetch(`/api/search?query=${debouncedQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error("Error fetching search suggestions:", error);
      });
  }, [debouncedQuery]);
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/search?query=${encodeURIComponent(debouncedQuery)}`,
        );

        const data = await response.json();

        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);

        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // ya 200ms

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const q = searchParams.get("query");

    if (q) {
      setQuery(q);
    }
  }, [
    searchParams,
  ]); /* [searchParams] ya dependency array is lya hoti h k jb new searchParams ay useEffect dobara run ho jay agr ya [] empty ho to ek hi dfa run ho ga function Dependency array me sirf woh variables aate hain jo useEffect ke andar use ho rahe hote hain. */

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (query.trim() !== "") {
        router.push(`/search?query=${encodeURIComponent(query)}`);
      }
    }
  };
  return (
    <>
      {/* Search Icon */}
      <button onClick={() => setOpen(true)}>
        <Search className="h-6 w-6 hover:text-blue-600 transition" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Search Products</h2>

              <button onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="mt-5 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
            />
            {query.trim() === "" && (
              <p className="mt-6 text-gray-500">Start typing to search...</p>
            )}

            {loading && (
              <p className="mt-6 text-center font-medium text-blue-600">
                Searching...
              </p>
            )}

            {!loading &&
              query.trim() !== "" &&
              debouncedQuery.trim() !== "" &&
              suggestions.length === 0 && (
                <p className="mt-6 text-center text-gray-500">
                  No products found.
                </p>
              )}
           
            {suggestions.length > 0 && (
              <div className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion._id}
                    onClick={() => {
                      router.push(`/product/${suggestion.slug}`);
                      setOpen(false);
                      setQuery("");
                      setSuggestions([]);
                    }}
                    className="block w-full border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-100"
                  >
                    {suggestion.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
