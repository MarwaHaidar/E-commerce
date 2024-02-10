import React, { useState, useEffect } from 'react';
import styles from './productCart.module.css';
import axios from 'axios';
//import { useCart } from '../../../cartcontext'; // Import the useCart hook from the CartProvider file

// const storedUserId = JSON.parse(localStorage.getItem('userid'));

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









let accessToken = getAccessToken();

let storedUserId = localStorage.getItem('userId');

if (storedUserId) {
    // Data is not null or empty, parse it as JSON
    storedUserId = JSON.parse(storedUserId);
} else {
    // Data is null or empty, handle it appropriately
    console.error('No userId data found in localStorage.');
}

const ProductCard = ({ imageSrc, name, color, size, price, initialQuantity, subTotal }) => {
  const [items, setCartItems] = useState([]);

  async function getCard()
  {
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/user/getcart/${storedUserId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    })
    .then((response) => {
      const itemsData = response.data;
      setCartItems(itemsData);
      console.log(accessToken);
    })
    .catch(error => console.error("Error fetching cart data:", error));
    
  }

  useEffect(() => {
    getCard();
  }, []); // Use cartItem as a dependency for useEffect




















  const [quantity, setQuantity] = useState(initialQuantity);
  //const { cart, setCart } = useCart(); // Use the useCart hook to access cart and setCart functions


  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    // Check if the new quantity is valid
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // Update the quantity
      setQuantity(newQuantity);
    }
  };

  // const [items, setCartItems] = useState(null);
  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: `http://localhost:5000/user/cart`
  //   })
  //     .then((response) => {
  //       const itemsData = response.data.items;
  //       setCartItems(itemsData);
       
  //     })
      
  //     .catch(error => console.error("Error: no such product Id", error));
  // },[]);


  // const handleAddToCart = () => {
  //   // Create a new product object
  //   const productToAdd = {
  //     name: name,
  //     price: price,
  //     quantity: quantity,
  //     subTotal: price * quantity
  //   };
  //   // Update the cart by adding the new product
  //   setCart([...cart, productToAdd]);
  // };

  return (
    <div className={styles.flashsale}>
      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', width: '83%' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {imageSrc && <img src={imageSrc} alt={name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} />}
          <div style={{ marginTop:'30px'}}>{name}</div>
        </div>
        <div>{color}</div>
        <div>{size}</div>
        <div>${Number(price).toFixed(2)}</div>

        <div>
          <input
            style={{ width: '50px', textAlign: 'center', marginLeft: '10px', border: '2px solid black' }}
            type="number"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
          />
        </div>
        <div>${Number(subTotal).toFixed(2)}</div>
        <div>
          {/* <button onClick={handleAddToCart}>Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
