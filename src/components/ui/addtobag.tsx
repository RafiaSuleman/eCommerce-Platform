'use client'
import { urlFor } from "@/lib/sanity";
import { Button } from "./button";
import { useShoppingCart } from "use-shopping-cart";

export interface ProductImage {
    _type: string;  // Add '_type' field to match 'CustomSanityImageSource'
    asset: {
        _ref: string;
        _type: string;
    };
}

export interface ProductCart{
    name: string;
    description: string;
    price: number;
    currency: string;
    image: ProductImage;  // Use the updated 'ProductImage' type
}

export default function AddToBag({ currency, description, image, name, price }: ProductCart) {
    const { addItem, handleCartClick } = useShoppingCart();
    
    const product = {
        name: name,
        description: description,
        price: price,
        currency: currency,
        image: urlFor(image).url(), // Use urlFor to get the image URL
        id: "4398754092"
    };

    return (
        <Button onClick={() => { addItem(product); handleCartClick(); }}>
            Add to Cart
        </Button>
    );
}
