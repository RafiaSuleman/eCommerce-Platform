import { client } from "@/lib/sanity";
import { simplifiedProduct } from "../interface";
import CategoryProducts from "@/components/categoryProducts";

// Fixing the typo in the parameter 'category'
async function getData(category: string) {
  const query = `*[_type == "product" && category->name == $category] {
    _id,
    "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
  }`;

  const data = await client.fetch(query, {
    category,
  });

  console.log("SANITY CATEGORY:", category);
  console.log("SANITY PRODUCTS:", data);
  console.log("SANITY COUNT:", data.length);

  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
// data shape clearly define hoti hai aur runtime errors kam hote hain-> wy use simplifiedProduct[]
  const data: simplifiedProduct[] = await getData(params.category);
console.log("CATEGORY:", params.category);
console.log(
  "PRODUCT NAMES:",
  data.map((product) => product.name)
);
console.log("PRODUCT COUNT:", data.length);
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

   <CategoryProducts products={data} />
    </div>
  );
}
