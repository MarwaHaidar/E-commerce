import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './charts.module.css';
import { BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, LinearGradient, Stop } from 'recharts';

function ProductCard() {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subcategoryCount, setSubcategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    fetchProductCount();
    fetchCategoryCount();
    fetchSubcategoryCount();
    fetchUserCount();
    fetchData();
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


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charts/usercountbyyear', { withCredentials: true }); // Replace this with your API endpoint
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user count by year:', error);
    }
  };

  // const years = userData.map(item => item._id);
  // const userCounts = userData.map(item => item.count);
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
      <div className={styles.charts}>
        <div className={styles.bargraph1}>
          <h2 className={styles.charttitle}>COUNT OF USERS BY YEARS</h2>
          <BarChart width={730} height={300} data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#07393C" />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
          </BarChart>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
