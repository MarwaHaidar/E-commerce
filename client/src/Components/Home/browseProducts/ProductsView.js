import React, { useState } from "react";
import ProductCard from "./ProductCard.js";
import Pagination from './Pagination.js';
import products from './temp/ProductsData'; // temporary import for testing





const ProductsView = () => {
    const productsPerPage = 30;
    const [currentPage, setCurrentPage] = useState(0);

    // const products = [
    //     // axios to retrieve the real data

    // ]


    const totalProducts = products.length;

    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    return (
        <div className="bg-custom-white">
            <div className="mx-auto max-w-2xl px-8 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:mx-auto">
                <h2 className="sr-only">Products</h2>
                <ProductCard products={currentProducts} />
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={totalProducts}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ProductsView;