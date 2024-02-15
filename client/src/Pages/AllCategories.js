import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Categoriescard from "../Components/Home/Browsecategory/Categoriescard";
import { Link } from "react-router-dom";
import styles from "../Components/Home/Browsecategory/Categoriescard.module.css";

function AllCategories() {
  const [categories, setCategories] = useState([]);
  const topRef = useRef(null);

  useEffect(() => {
    // Fetch categories when the component mounts
    axios
      .get("http://localhost:5000/categories")
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [categories]); 

  return (
    <div>
      <div>
         <div ref={topRef} className={styles.brosewcategoriestopic}>
          <p>All Category</p>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-[-50px] ml-[-50px] relative">
            {categories.map((category) => (
              <div key={category.id} id={`category-${category.id}`}>
                <Link to={`/categories/${category._id}/subcategories`}>
                  <Categoriescard category={category} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCategories;
