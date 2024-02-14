import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SubCategoryCard from "../Components/Home/SubCategory/SubCategoryCard";
import { Link, useParams } from "react-router-dom";
import styles from '../Components/Home/SubCategory/SubCategory.module.css'
function SubCategories() {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const topRef = useRef(null);
  console.log(categoryId);
  useEffect(() => {

    axios
      .get(`http://localhost:5000/categories/${categoryId}/subcategories`)
      .then((response) => setSubcategories(response.data.data))
      .catch((error) => console.error("Error fetching subcategories:", error));

  }, []);
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [subcategories]); // Include categoryId as a dependency
  return (
    <div className="browsecategory">
  <div ref={topRef} className={styles.brosewcategoriestopic}>
    <p>All Subcategories</p>
  </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-[-50px] ml-[-50px] relative">
          {subcategories.map((subcategory) => (
            <div key={subcategory._id}>
              <Link to={`/subcategories/${subcategory._id}/products`}>
                <SubCategoryCard subcategory={subcategory} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubCategories;
