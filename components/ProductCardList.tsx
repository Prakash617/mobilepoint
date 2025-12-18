import React from 'react'
import ProductCard from './ProductCard'

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  tag?: boolean;
  tag_text?: string;
  tagColor?: string;
  tagPrice?: string | null;
  free_shipping?: boolean;
  free_gift?: boolean;
  new?: boolean;
  sub_images?: string[];
  in_stock?: boolean;
  quantity?: number;
};

type Props = {
  products: Product[]
  limit?: number
}

const ProductCardList = ({ products, limit }: Props) => {
  const visibleProducts = limit ? products.slice(0, limit) : products
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center">
      {visibleProducts.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          tag={product.tag_text}
          tagText='Save'
          tagColor="green"
          tagPrice={product.tagPrice ? Number(product.tagPrice) : undefined}
          free_shipping={product.free_shipping}
          free_gift={product.free_gift}
          new={product.new}
          sub_images={product.sub_images}
          slug={product.slug}
          in_stock={product.in_stock ?? true}
          quantity={product.quantity}
        />
      ))}
    </div>
  )
}

export default ProductCardList
