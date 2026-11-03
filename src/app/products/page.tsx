import ProductListComponent from "@/components/Product/ProductListComponent";
import ProductListComponentUSE from "@/components/Product/ProductListComponent(use)";
import { Suspense } from "react";

const getAllProduct = () =>
    fetch(`${process.env.DUMMY_API}/products`)
    .then((res) => res.json())
    .then(products=>products.products)
    .catch(err => err);
    
    

export default function ProductPage() {

    const productList = getAllProduct();

    
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
            
            <ProductListComponentUSE
            
            product={productList}
            
            />

            </Suspense>
        </div>
    )
}