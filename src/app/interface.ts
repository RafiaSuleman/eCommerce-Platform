interface ImageAsset {
  _key: string;
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}
  export interface simplifiedProduct {
    _id: string;
     imageUrl: string;
    price: number;
    slug: string;
    categoryName: string;
    name: string;
  }
  
  export interface fullProduct {
    price_id: string;
    _id: string;
    images: ImageAsset[]; // Updated from 'any' to a specific type
    price: number;
    slug: string;
    categoryName: string;
    name: string;
    description: string;
  }
  

  