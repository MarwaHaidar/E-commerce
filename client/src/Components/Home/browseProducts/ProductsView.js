import React from "react";
import ProductCard from "./ProductCard.js";






const ProductsView = () => {
    return (
        <div className="bg-custom-white">
            <div className="mx-auto max-w-2xl px-8 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:mx-auto">
                <h2 className="sr-only">Products</h2>

                < ProductCard />
            </div>
        </div>
    )
}

export default ProductsView