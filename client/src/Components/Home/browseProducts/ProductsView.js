import React, { useState, useContext, useEffect } from "react";
import DataContext from '../../Context.js';
import ProductCard from "./productcard.js";
import Pagination from './Pagination.js';
import FilterBox from '../slider/FilterableMenu.js';
import { FaFilter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";


const ProductsView = () => {
    console.log("rendered")
    const { products, setProducts } = useContext(DataContext);
    console.log(products)
    const [currentPage, setCurrentPage] = useState(0);
    const [filterBoxVisible, setFilterBoxVisible] = useState(false);
    const [filterIconVisible, setFilterIconVisible] = useState(true);

    console.log("Type of products:", Array.isArray(products));


    // Check if products is undefined before accessing its properties
    const productsPerPage = 10;
    const totalProducts = products ? products.length : 0;
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    let currentProducts;
    if (Array.isArray(products)) {
        currentProducts = products ? products.slice(startIndex, endIndex) : [];
    } else {
        currentProducts = products ? products.results.slice(startIndex, endIndex) : [];
    }



    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const showFilterBoxVisibility = () => {
        setFilterBoxVisible(!filterBoxVisible);
        setFilterIconVisible(!filterIconVisible);
    };

    const hideFilterBox = () => {
        setFilterBoxVisible(false);
        setFilterIconVisible(true);
    };

    useEffect(() => {
        const retrievedData = window.localStorage.getItem("retrieved-products");
        if (retrievedData) {
            const parsedData = JSON.parse(retrievedData);
            setProducts(parsedData);
        }
    }, []);


    useEffect(() => {

        window.localStorage.setItem("retrieved-products", JSON.stringify(products));
        console.log("Products stored in localStorage");
    }, [products]); // This useEffect runs whenever products state changes



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
}
export default ProductsView;