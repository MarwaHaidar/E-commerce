import React, { useState } from 'react';
import styles from './productCart.module.css';

const ProductCard = ({ imageSrc, name, price, initialQuantity, subTotal }) => {
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
        <div style={{display:'flex',flexDirection:'row'}}>
            {imageSrc && <img src={imageSrc} alt={name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} />}
            <div>{name}</div>
        </div>
        <div>Price: {price}</div>
        <div>Quantity:
        <input
        style={{ width:'50px', textAlign:'center',marginLeft:'10px',border:'2px solid black' }}
          type="number"
          value={initialQuantity}
          min="1"
          onChange={handleQuantityChange}
        />

        </div>
        <div>subTotal: {subTotal}</div>
    </div>
    </div>

  );
};

export default ProductCard;
