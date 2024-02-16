import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './charts.module.css';
import {AreaChart,Area,Pie,PieChart, BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, LinearGradient, Stop } from 'recharts';

function ProductCard() {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subcategoryCount, setSubcategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const[orderData,setOrderData]=useState([]);
  const[userbyCountry,setUserbyCountry]=useState([]);


  useEffect(() => {
    fetchProductCount();
    fetchCategoryCount();
    fetchSubcategoryCount();
    fetchUserCount();
    fetchData();
    fetchorderbyyear();
    fetchusersbycountry();
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
  const fetchorderbyyear= async () => {
    try {
      const response = await axios.get('http://localhost:5000/charts/ordercountbyyear', { withCredentials: true }); // Replace this with your API endpoint
      setOrderData(response.data);
    } catch (error) {
      console.error('Error fetching user count by year:', error);
    }
  };
  const fetchusersbycountry= async () => {
    try {
      const response = await axios.get('http://localhost:5000/charts/userscountbycountry', { withCredentials: true }); // Replace this with your API endpoint
      setUserbyCountry(response.data);
    } catch (error) {
      console.error('Error fetching user count by year:', error);
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
        <div className={styles.areagraph}>
        <h2 className={styles.charttitle}>COUNT OF ORDERS BY YEARS</h2>
        <AreaChart width={730} height={310} data={orderData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#07393C" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#07393C" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="_id" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
        </div>
      </div>
      <div className={styles.charts}>
      <div className={styles.piechart}>
      <h2 className={styles.charttitle}>COUNT OF USERS BY COUNTRY</h2>
      <PieChart width={730} height={300}>
        <Pie data={userbyCountry} dataKey="userCount" outerRadius={100}  nameKey="_id" cx="50%" cy="50%"  fill="#07393C"  />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
        {/* <div className={styles.areagraph}> */}
        {/* <h2 className={styles.charttitle}>COUNT OF ORDERS BY YEARS</h2> */}
        {/* <AreaChart width={730} height={310} data={orderData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#07393C" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#07393C" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="_id" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default ProductCard;
