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

            <div className="mt-6 text-gray-500">Start typing to search...</div>
            {suggestions.length > 0 && (
              <div className="mt-2 rounded-lg border bg-white shadow-lg">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion._id}
                    className="cursor-pointer px-4 py-3 hover:bg-gray-100"
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
