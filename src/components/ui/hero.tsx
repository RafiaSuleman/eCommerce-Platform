import React from "react";
import Image from "next/image";
import { client } from "@/lib/sanity"; // Removed 'urlFor'
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";
  const data = await client.fetch(query);
  return data;
}

export default async function Hero() {
  const data = await getData();

  if (!data || !data.image1) {
    return <p>Image not found or loading...</p>;
  }

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8 mt-5">
     <div className="flex flex-wrap items-center justify-between">
       <div className="flex w-full flex-col justify-center lg:w-1/3">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
            🔥 New Collection 2026
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Elevate Your <br />
            Style with <br />
            Premium Fashion
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-gray-600">
            Discover premium fashion for men, women, and teens. Carefully
            curated collections with secure Stripe payments, fast shipping, and
            exceptional quality.
          </p>
          <div className=" mt-3 flex flex-wrap gap-4 "  id="featured-products">
            <Link
              href="#featured-products"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Shop Now
            </Link>

            <Link
               href="#featured-products"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Explore Collection
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <span>⭐ 4.9/5 Rating</span>
            <span>🚚 Free Shipping</span>
            <span>🔒 Secure Stripe Payment</span>
          </div>
        </div>

        <div className="mb-12 flex w-full items-center justify-center lg:w-1/2">
          <div className="relative left-8 top-8 z-10 -ml-8 overflow-hidden rounded-3xl border border-white bg-white shadow-2xl">
             <div className="absolute -z-10 h-80 w-80 rounded-full bg-blue-100 blur-3xl"></div>
            <Image
              src="/heroimages/heroimage2.webp"
              alt="Great Photo"
              width={380}
              height={500}
              className="rounded-2xl object-cover shadow-2xl"
              priority
            />
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white px-4 py-3 shadow-xl">
              <p className="text-xs text-gray-500">Limited Offer</p>
              <h3 className="text-lg font-bold text-red-600">Up to 50% OFF</h3>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
            <Image
              src="/heroimages/heroimage1.webp"
              alt="Great Photo"
              width={340}
              height={440}
              className="rounded-2xl object-cover shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
