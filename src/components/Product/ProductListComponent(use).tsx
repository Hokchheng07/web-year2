'use client'


import { use } from 'react'
import { Product, ProductCardComponent } from './ProductCardComponent'


export default function ProductListComponentUSE (
    {product} : {product:Promise<Product[]>}
) {

    const Products = use(product);


    return (
        <section className="container grid grid-cols-1 sm: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-7 mx-auto">
        {
        Products.map((pro:Product)=>(
            <ProductCardComponent
            id={pro?.id}
            title={pro?.title}
            description={pro?.description}
            thumbnail={pro?.thumbnail}
            price={pro?.price}
            
            />
        ))
    }
    </section>
    )


}