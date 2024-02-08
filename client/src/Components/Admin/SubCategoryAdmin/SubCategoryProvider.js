// CategoryProvider.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubCategoryContext from './SubCategoryContext';

const SubCategoryProvider = ({ children }) => {
  const [SubcategoryData, setSubCategoryData] = useState(null);

  useEffect(() => {
    // Fetch initial category data here if needed
  }, []);

  const updateSubCategoryData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/subcategories/${id}`);
      setSubCategoryData(response.data.data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };
  return (
    <SubCategoryContext.Provider value={{ SubcategoryData, updateSubCategoryData }}>
    {children}
    </SubCategoryContext.Provider>
  );
};

export default SubCategoryProvider;
