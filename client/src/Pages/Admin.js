import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SiteBar from '../Components/Admin/SiteBar/SiteBar';
import ProductCardAdmin from '../Components/Admin/ProductsAdmin/ProductCardAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../Components/Admin/ProductsAdmin/ProductsAdmin.module.css'

const getAccessToken = () => {
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };
  return getCookie('accessToken');
};

function Admin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products?page=1&limit=1000`);
        setProducts(response.data.data); // Set an empty array if response.data is falsy
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  let accessToken = getAccessToken();
  const handleDeleteClickproduct = async (id) => {
    try {
      // Make an API request to delete the product with the given productId
      await axios.delete(`http://localhost:5000/admin/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      });

      // Update the state to reflect the deletion
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      toast.success('Delete this Product successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>  <ToastContainer />
    
    <div className={styles.producAdminPage}>
    <SiteBar />
      {/* Display each product card */}
      {products.map((product) => (
        <ProductCardAdmin
          key={product._id}
          {...product}
          onDelete={() => handleDeleteClickproduct(product._id)}
        />
      ))}
    </div>
    </div>
  );
}


export default Admin;
