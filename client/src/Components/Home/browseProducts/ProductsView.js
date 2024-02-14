import React, { useState, useContext, useEffect } from "react";
import DataContext from '../../Context.js';
import ProductCard from "./productcard.js";
import Pagination from './Pagination.js';
import FilterBox from '../slider/FilterableMenu.js';
import { FaFilter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

// authorize
const getAccessToken = () => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };
    return getCookie('accessToken');
  
  
  };

const ProductsView = () => {
    const { products, setProducts, setProductInWishlist, setItemsCount } = useContext(DataContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [filterBoxVisible, setFilterBoxVisible] = useState(false);
    const [filterIconVisible, setFilterIconVisible] = useState(true);




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

    const userId = '65a8f6cff242b58ff5272d12'; // temoporary
    let accessToken = getAccessToken();
    const addToWishList = (productId) => {
        console.log("invoked")
        axios.post('http://localhost:5000/user/wishlist', {
            userId, // temporary
            productId
        },
        {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
    
          }
        )
            .then(response => {
                console.log('Item added successfully:', response);
                setProductInWishlist(prevProducts => prevProducts.filter(product => product.productId !== products.productId));
                axios.get(`http://localhost:5000/user/wishlist/${userId}`)
                    .then(response => {
                        const count = response.data.result;
                        console.log("Wishlist count:", count);
                        setItemsCount(count);
                    })
                    .catch(error => {
                        console.error("Error fetching wishlist count:", error);
                    });
            })
            .catch(error => {
                console.error('Error adding item:', error);
                // Handle the error appropriately
            });
    }




    useEffect(() => {

        const retrievedData = window.localStorage.getItem("retrieved-products");
        if (retrievedData) {
            const parsedData = JSON.parse(retrievedData);

            if (!products || (Array.isArray(products) && products.length === 0)) {
                setProducts(parsedData);
            }
        }
    }, [setProducts, products]);


    useEffect(() => {
        if (products && products.length > 0) {
            window.localStorage.setItem("retrieved-products", JSON.stringify(products));
            console.log("Products stored in localStorage");
        }
    }, [products]);









    return (
        <div className="bg-custom-white">
            <div className="mx-auto max-w-2xl px-8 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:mx-auto">
                <h2 className="sr-only">Products</h2>
                {filterIconVisible && <FaFilter className="filter-icon" onClick={showFilterBoxVisibility} />}
                <div className={`${filterBoxVisible ? "filter-box" : "filter-box-hidden"}`}>
                    <IoMdClose className="boxClose" onClick={hideFilterBox} />
                    <FilterBox />
                </div>

                <ProductCard products={currentProducts} addToWishList={addToWishList} />
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