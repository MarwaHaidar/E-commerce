import React, { useEffect, useState } from 'react';
import styles from './firstRow.module.css';
import axios from 'axios';
import { BsTrash3Fill } from "react-icons/bs";

const ProductItem = ({ item, handleQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [subtotal, setSubtotal] = useState(item.quantity * item.price);

  // Update the subtotal whenever the quantity changes
  useEffect(() => {
    setSubtotal(quantity * item.price);
  }, [quantity, item.price]);

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
      handleQuantityChange(item.productId, newQuantity);
    }
  };

  return (
    <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', width: '83%' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div >{item.image && <img src={item.image} alt={item.productName} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} />}</div>
        <div style={{ marginTop: '30px' }}>{item.productName}</div>
      </div>
      <div>{item.color}</div>
      <div>{item.size}</div>
      <div>{item.price + " " + item.currency}</div>
    

      <div>
        <input
          style={{ width: '50px', textAlign: 'center', marginLeft: '10px', border: '2px solid black' }}
          type="number"
          value={quantity}
          min="1"
          onChange={handleChange}
        />
      </div>
      <div style={{textAlign:'center'}}>${subtotal.toFixed(2)}</div>
      <div style={{fontSize:'30px'}}><BsTrash3Fill /></div>
    
    </div>
  );
};

const FirstRaw = () => {
  const [items, setCartItems] = useState([]);

  async function getCard() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/user/getcart`, { withCredentials: true });
      const itemsData = response.data;
      setCartItems(itemsData.data.items);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  useEffect(() => {
    getCard();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      // Send update request to backend
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/cart/update/${productId}`, {
        quantity: newQuantity
      });
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className={styles.flashsale}>
      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'white', padding: '10px 0', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', width: '83%' }}>
        <div>Product</div>
        <div style={{paddingLeft:'140px'}}>Color</div>
        <div>Size</div>
        <div>Price</div>
        <div>Quantity</div>
        <div style={{paddingRight:'90px'}}>SubTotal</div>
      </div>
      {items.length > 0 ? items.map(item => (
        <ProductItem
          key={item.productId}
          item={item}
          handleQuantityChange={handleQuantityChange}
        />
      )) :
        <div>No Products Found!</div>}
    </div>
  );
};

export default FirstRaw;
