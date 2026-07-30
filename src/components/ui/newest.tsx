import { simplifiedProduct } from "@/app/interface";
import { client } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./productCard";

async function getData() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt desc){
  _id,
    name,
    price,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
}
`;
  const data = await client.fetch(query);
  return data;
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData();
  return (
    <div className="bg-white" id="featured-products">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              New Arrivals
            </span>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Featured Products
            </h2>

            <p className="mt-2 text-gray-500">
              Explore our latest premium fashion collection.
            </p>
          </div>

          <Link
            href="/allProducts"
            className="flex items-center gap-2 rounded-xl border px-5 py-3 font-medium transition hover:bg-gray-100"
          >
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="mx-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-10">
          {data.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm  hover:shadow-2xl"
            >
              <ProductCard
                key={product._id}
                name={product.name}
                image={product.imageUrl}
                price={product.price}
                slug={product.slug}
                categoryName={product.categoryName}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
