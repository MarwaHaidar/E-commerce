// CategoryProvider.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryContext from './CategoryContext';

const CategoryProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // Fetch initial category data here if needed
  }, []);

  const updateCategoryData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/categories/${id}`);
      setCategoryData(response.data.data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };
  return (
    <CategoryContext.Provider value={{ categoryData, updateCategoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
