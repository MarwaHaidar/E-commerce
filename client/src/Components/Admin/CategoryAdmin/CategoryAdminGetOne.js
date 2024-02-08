// CategoryAdminGetOne.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCategoryContext } from './CategoryContext';
import styles from './CategoryAdmin.module.css'

function CategoryAdminGetOne() {
  const { id } = useParams();
  const { categoryData, updateCategoryData } = useCategoryContext();

  useEffect(() => { //Use useEffect to fetch category data when the component mounts or when the id changes
    updateCategoryData(id);
  }, []);

  // useEffect(() => { //Use useEffect to fetch category data when the component mounts or when the id changes
  //   updateCategoryData(id);
  // }, [id, updateCategoryData]);
  return (
    <div>
      {categoryData ? (
        <div className={`max-w-lg mx-auto bg-white p-8 shadow-md rounded-md  ${styles.getonebox}`}>
          <img
            src={categoryData.image}
            alt={categoryData.name}
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
        <div className='flex flex-col  items-center'>
      <h1 className="text-2xl font-bold mb-2">{categoryData.name}</h1>
      <p className="text-gray-600 mb-4">{categoryData.desc}</p>
    </div>
          {/* Add additional information or styling as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CategoryAdminGetOne;
