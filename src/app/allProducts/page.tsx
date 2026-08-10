import { simplifiedProduct } from "@/app/interface";
import { client } from "@/lib/sanity";
import CategoryProducts from "@/components/categoryProducts";

async function getData() {
 const query = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  price,
  "slug": slug.current,
  "categoryName": category->name,
  "imageUrl": images[0].asset->url
}`;
  const data = await client.fetch(query);

  return data;
}

export default async function AllProductsPage() {
  const data: simplifiedProduct[] = await getData();
  console.log("ALL PRODUCTS:", data);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Our Collection
          </span>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            All Products
          </h1>

          <p className="mt-2 text-gray-500">
            Explore our complete premium fashion collection.
          </p>
        </div>

         <CategoryProducts products={data} />
      </div>
    </main>
  );
}