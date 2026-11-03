"use client"

import React, { useEffect, useState } from 'react'
import { Product, ProductCardComponent } from './ProductCardComponent'
export default function ProductListComponent() {
  const [Product, setProduct] = useState([])
  useEffect(()=>{
    const productRequest = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_DUMMY_API}/products`);
      const res = await data.json();

      setProduct(res?.products);
    };
    productRequest()
  },[])
  return (
    <section className="container grid grid-cols-1 sm: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-7 mx-auto">
      {
        Product.map((pro:Product)=>(
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
  );
}
