import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './charts.module.css';

function ProductCard() {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subcategoryCount, setSubcategoryCount] = useState(0);
  const[userCount,setUserCount]=useState(0);


  useEffect(() => {
    fetchProductCount();
    fetchCategoryCount();
    fetchSubcategoryCount();
    fetchUserCount();
  }, []);

  const fetchProductCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charts/productcount', { withCredentials: true });
      setProductCount(response.data.count);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  const fetchCategoryCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charts/categoriescount', { withCredentials: true });
      setCategoryCount(response.data.count);
    } catch (error) {
      console.error('Error fetching category count:', error);
    }
  };
  const fetchSubcategoryCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charts/subcategorycount', { withCredentials: true });
      setSubcategoryCount(response.data.count);
    } catch (error) {
      console.error('Error fetching category count:', error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charts/usercount', { withCredentials: true });
      setUserCount(response.data.count);
    } catch (error) {
      console.error('Error fetching category count:', error);
    }
  };
  return (
    <div className={styles.chartcontainer}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h1 className={styles.cardtitle}>Count Of Products</h1>
          <p className={styles.carddetails}>{productCount}</p>
        </div>

        <div className={styles.card}>
          <h1 className={styles.cardtitle}>Count Of Categories</h1>
          <p className={styles.carddetails}>{categoryCount}</p>
        </div>

        <div className={styles.card}>
          <h1 className={styles.cardtitle}>Count Of Subcategories</h1>
          <p className={styles.carddetails}>{subcategoryCount}</p>
        </div>

        <div className={styles.card}>
          <h1 className={styles.cardtitle}>Count Of Users</h1>
          <p className={styles.carddetails}>{userCount}</p>
        </div>

      
      </div>
    </div>
  );
}

export default ProductCard;
