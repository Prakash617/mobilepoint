import { ProductCardProps } from '@/types'
import ProductCardList from './ProductCardList'
import ProductCard from './ProductCard'

type Props = {
    products: ProductCardProps[]
}


const RelatedProduct = ({products}: Props) => {
  return (
       <div className="p-8 bg-white rounded-lg space-y-8 my-2">
            <div>
              <p className=" font-bold uppercase">related products</p>
            </div>
    
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 md:px-14 place-items-center">
      {products.map((product) => (
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
          </div>
  )
}

export default RelatedProduct