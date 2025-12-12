import React from 'react'
import ProductCard from './ProductCard'
import { ProductCardProps } from '@/types'

type Props = {
  products: ProductCardProps[]
  limit?: number   // 👈 NEW PROP
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
