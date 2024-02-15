import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/Home/BrowseProducts/productcard";

function ProductSubCategory() {
  const { subcategoriesId } = useParams();
  const [products, setProducts] = useState([]);
  const topRef = useRef(null);
  console.log("SubcategoryId", subcategoriesId);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/subcategories/${subcategoriesId}/products`)
      .then((response) => {
        console.log("API Response:", response.data);
        const responseData = response.data.data;

        // Check if responseData is an array before setting state
        if (Array.isArray(responseData)) {
          setProducts(responseData);
        } else {
          console.error("Invalid response data format:", responseData);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProducts([]);
      });
  }, [subcategoriesId]);
  


  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [products]); // Include categoryId as a dependency

  const brosewcategoriestopic = {
    marginTop: '1rem',
    fontSize: '1.5rem',
    fontWeight: 600,
    textAlign: 'center',
    color: '#2d3748',
  };
  return (
    <div ref={topRef}>
      <div style={brosewcategoriestopic}>
        <p>All products for this specific subcategory</p>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
        {/* Pass the entire array of products to ProductCard */}
        <ProductCard products={products} />
      </div>
    </div>
  );
}

export default ProductSubCategory;
