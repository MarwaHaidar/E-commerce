import React, { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCardAdmin from './ProductCardAdmin';
import styles from './ProductsAdmin.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

function ProductsAdminGet() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const headerRef = useRef(null);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/subcategories/${id}/products?page=${page}&limit=9`);
        setProducts(response.data.data);
        setTotalPages(prevTotalPages => {
          const calculatedTotalPages = Math.ceil(response.data.result / 9);
          console.log('Response totalPages:', calculatedTotalPages);
          console.log('State totalPages:', prevTotalPages);
          return calculatedTotalPages;
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, [id, page]);
  
  

  const handlePageChange = (newPage) => {
    // Ensure the newPage is not less than 1
    const nextPage = newPage < 1 ? 1 : newPage;
    setPage(nextPage);
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  let accessToken = getAccessToken();
  const handleDeleteClickproduct = async (Productid) => {
    try {
      const response = await axios.delete(`http://localhost:5000/admin/products/${Productid}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      });
      console.log(response.data);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== Productid));
      toast.success('Delete this Product successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div ref={headerRef}> </div>
    <div className={styles.producAdminMain}>
      {/* Display your fetched products here */}
      {products.map((product) => (
        <div key={product._id} className="mb-4">
          <ProductCardAdmin {...product} onDelete={() => handleDeleteClickproduct(product._id)} />
        </div>
      ))}
      </div>


      {/* Pagination controls */}
      <div className={styles.paginationContainerAdmin}>
      <button
       className={styles.paginationbuttonAdmin}
        onClick={() => handlePageChange(page - 1)}
        
      >
        Previous Page
      </button>
      <span className={styles.paginationTextAdmin}>Page {page} of {totalPages}</span>
      <button
       className={styles.paginationbuttonAdmin}
        onClick={() => handlePageChange(page + 1)}
        
      >
        Next Page
      </button>
      </div>


    </div>
  );
}

export default ProductsAdminGet;
