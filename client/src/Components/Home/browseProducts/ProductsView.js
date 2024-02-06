import React, { useState } from "react";
import ProductCard from "./ProductCard.js";
import Pagination from './Pagination.js';
import FilterBox from '../slider/FilterableMenu.js';
import { FaFilter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
// import products from './temp/ProductsData'; // temporary import for testing


const products = [
    {
        id: 1,
        name: 'specific search',
        href: '#',
        price: '$35',
        rating: '4',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.'
    }

]


const ProductsView = () => {
    const productsPerPage = 30;
    const [currentPage, setCurrentPage] = useState(0);
    const totalProducts = products.length;
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    const [filterBoxVisible, setFilterBoxVisible] = useState(false);
    const [filterIconVisible, setFilterIconVisible] = useState(true);

    const showFilterBoxVisibility = () => {
        setFilterBoxVisible(!filterBoxVisible);
        setFilterIconVisible(!filterIconVisible);
    };

    const hideFilterBox = () => {
        setFilterBoxVisible(false);
        setFilterIconVisible(true);
    };






    return (
        <div className="bg-custom-white">
            <div className="mx-auto max-w-2xl px-8 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:mx-auto">
                <h2 className="sr-only">Products</h2>
                {filterIconVisible && <FaFilter className="filter-icon" onClick={showFilterBoxVisibility} />}
                <div className={`${filterBoxVisible ? "filter-box" : "filter-box-hidden"}`}>
                    <IoMdClose className="boxClose" onClick={hideFilterBox} />
                    <FilterBox />
                </div>

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