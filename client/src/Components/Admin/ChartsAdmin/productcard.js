import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import styles from './charts.module.css';

function ProductCard() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
      fetchProductCount();
  }, []);

  const fetchProductCount = async () => {
      try {
          const response = await axios.get('http://localhost:5000/charts/productcount',{withCredentials:true}); // Replace this with your actual endpoint
          setProductCount(response.data.count); // Assuming your response is like { count: 10 }
      } catch (error) {
          console.error('Error fetching product count:', error);
      }
  };

  return (
    <>
    <div className={styles.chartcontainer}>
     <div className={styles.cards}>
      <div className={styles.card}>
        <h1 className={styles.cardtitle}>Count Of Products</h1>
        <p className={styles.carddetails}>{productCount}</p>
      </div>

      <div className={styles.card}>
        <h1 className={styles.cardtitle}>Count Of Products</h1>
        <p className={styles.carddetails}>{productCount}</p>
      </div>

      <div className={styles.card}>
        <h1 className={styles.cardtitle}>Count Of Products</h1>
        <p className={styles.carddetails}>{productCount}</p>
      </div>

      <div className={styles.card}>
        <h1 className={styles.cardtitle}>Count Of Products</h1>
        <p className={styles.carddetails}>{productCount}</p>
      </div>
     </div>







    </div>
    
    
    </>
      
           
  );    
};



export default ProductCard
