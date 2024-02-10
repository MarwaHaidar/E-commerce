import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCardAdmin from './ProductCardAdmin';
import styles from './ProductCardAdmin.module.css'

function ProductsAdminGet() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your server using Axios
    axios.get(`http://localhost:5000/subcategories/${id}/products`)
      .then((response) => {
        setProducts(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [id]);

  return (
    <div className={styles.producAdminMain}>
      {/* Display your fetched products here */}
      {products.map((product) => (
        <div key={product._id} className="mb-4">
          <ProductCardAdmin {...product} />
        </div>
      ))}
    </div>
  );
}

export default ProductsAdminGet;
