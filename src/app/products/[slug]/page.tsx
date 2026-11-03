import { ProductDetail } from '@/components/Product/product-detail1';
import React, { Suspense } from 'react'

export default async function page(
  {params} : {params : Promise<{slug:string}>}
) {
  const {slug} = await params;
  
  const productDetailList = () =>
    fetch(`${process.env.DUMMY_API}/products/${slug}`)
    .then(res => res.json())
    .then(productres => productres)
    .catch(err => err)

  const product = productDetailList();
  
  return (
    <Suspense fallback={<div>loading...</div>}>

      <ProductDetail
      product={product}/>

    </Suspense>
  )
}
