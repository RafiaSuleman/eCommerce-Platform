import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  slug: string;
  categoryName: string;
}

export default function ProductCard({
  name,
  image,
  price,
  slug,
  categoryName,
}: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div >
      <div className="flex-row text-center justify-center">
      <div className="p-5 ">
        <p className="text-sm text-gray-500">{categoryName}</p>

        <h3 className="mt-2 text-lg font-semibold text-gray-900">{name}</h3>
      </div>
        <div className="mt-2  gap-2 text-yellow-500">
                  ⭐⭐⭐⭐⭐
                  <span className="text-sm text-gray-500">(4.9)</span>
                </div>
      <div className="mt-4 gap-3 flex items-center justify-center">
        <span className="text-xl font-bold text-blue-600 ">${price}</span>
        <span className="text-gray-400 line-through">${price + 30}</span>
      </div>
      <Link
        href={`/product/${slug}`}
        className="mt-5 block rounded-xl bg-gray-900 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
      >
        View Product
      </Link>
      </div>
    </div>
  );
}
