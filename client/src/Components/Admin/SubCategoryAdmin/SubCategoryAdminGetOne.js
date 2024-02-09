import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSubCategoryContext } from './SubCategoryContext';
import styles from './SubCategoryAdmin.module.css';

function SubCategoryAdminGetOne() {
    const { id } = useParams();
  const { SubcategoryData, updateSubCategoryData} = useSubCategoryContext();

  useEffect(() => { //Use useEffect to fetch category data when the component mounts or when the id changes
    updateSubCategoryData(id);
  }, []);

  return (
    <div>
      {SubcategoryData ? (
        <div className={`max-w-lg mx-auto bg-white p-8 shadow-md rounded-md  ${styles.getonebox}`}>
          <img
            src={SubcategoryData.image}
            alt={SubcategoryData.name}
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <h1 className="text-2xl font-bold mb-2">{SubcategoryData.name}</h1>
          <p className="text-gray-600 mb-4">{SubcategoryData.desc}</p>
          {/* Add additional information or styling as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SubCategoryAdminGetOne
