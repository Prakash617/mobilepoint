import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'



type Props = {
  products: Product[]
}

const ProductCardList = ({ products }: Props) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center">
      {products.map((product) => (

        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductCardList
