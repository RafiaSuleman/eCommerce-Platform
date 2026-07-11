import { client } from "@/lib/sanity";
import { simplifiedProduct } from "../interface";
import Image from "next/image";
import Link from "next/link";

// Fixing the typo in the parameter 'category'
async function getData(cateogry: string) {
  const query = `*[_type == "product" && category->name == "${cateogry}"] {
    _id,
    "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
// data shape clearly define hoti hai aur runtime errors kam hote hain-> wy use simplifiedProduct[]
  const data: simplifiedProduct[] = await getData(params.category);

  // If you need to use 'data', render it in JSX or process it.
  return (
    
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-ti">
            Our Products for {params.category}
          </h2>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-10">
        {data.map((product) => (
          <div key={product._id} className="group relative">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
              <Image
                src={product.imageUrl}
                alt="Product image"
                className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                width={300}
                height={300}
              />
            </div>

            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
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
    </div>
  );
}
