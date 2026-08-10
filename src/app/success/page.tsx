"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
export default function SuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useShoppingCart();

  const [message, setMessage] = useState("Saving your order...");
  const [isLoading, setIsLoading] = useState(true);
  const hasSaved = useRef(false);
  useEffect(() => {
    if (hasSaved.current) return;

    hasSaved.current = true;
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setMessage("Order session was not found.");
      setIsLoading(false);
      return;
    }

    async function saveOrder() {
      try {
        const response = await fetch("/api/order", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sessionId,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to save your order.");
        }

      if (data.message === "Order already exists") {
  setMessage("Your order has already been saved.");
} else {
  setMessage("Your order has been saved successfully.");
  clearCart();
}
      } catch (error) {
        console.error("Order saving error:", error);

        setMessage(
          "Your payment was successful, but we could not save your order.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    saveOrder();
  }, [searchParams,  clearCart]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Payment Successful!
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for your order. Your payment has been completed
          successfully.
        </p>

        <p className="mt-3 text-sm font-medium text-blue-600">
          {isLoading ? "Saving your order..." : message}
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
