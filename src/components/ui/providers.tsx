"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
      successUrl="https://commerce-next-yt.vercel.app/stripe/success"
      cancelUrl="https://commerce-next-yt.vercel.app/stripe/error"
      currency="USD"
      billingAddressCollection={false}
      shouldPersist={true}  //if reload page shopping cart items not go away
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}