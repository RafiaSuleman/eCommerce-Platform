import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET(request: Request) {
    
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json([]);
  }

  const products = await client.fetch(
    `*[_type == "product" && name match $search + "*"]{
      _id,
      name,
      "slug": slug.current,
      "image": images[0].asset->url,
      price
    }`,
    {
      search: query,
    }
  );

  return NextResponse.json(products);
}