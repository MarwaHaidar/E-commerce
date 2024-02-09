import React, { useState } from 'react';
import styles from './firstRow.module.css';

const FirstRaw = ({ imageSrc, name, price, initialQuantity, subTotal }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    // Check if the new quantity is valid
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // Update the quantity
      setQuantity(newQuantity);
    }
  };
  return (
    <div className={styles.flashsale}>
    <div style={{ marginTop: '30px',display: 'flex', alignItems: 'center',justifyContent:'space-between', backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px',width:'83%'}}>
        <div>Product</div>
        <div>Color</div>
        <div>Size</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>SubTotal</div>
    </div>
    </div>

  );
};

export default FirstRaw;

