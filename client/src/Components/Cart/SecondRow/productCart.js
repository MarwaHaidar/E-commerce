import React, { useState } from 'react';
import styles from './productCart.module.css';
import { useCart } from '../../../cartcontext'; // Import the useCart hook from the CartProvider file

const ProductCard = ({ imageSrc, name, price, initialQuantity, subTotal }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { cart, setCart } = useCart(); // Use the useCart hook to access cart and setCart functions

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    // Check if the new quantity is valid
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // Update the quantity
      setQuantity(newQuantity);
    }
  };

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
          <div>{name}</div>
        </div>
        <div>Price: ${Number(price).toFixed(2)}</div>

        <div>Quantity:
          <input
            style={{ width: '50px', textAlign: 'center', marginLeft: '10px', border: '2px solid black' }}
            type="number"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
          />
        </div>
        <div>SubTotal: ${Number(subTotal).toFixed(2)}</div>
        <div>
          {/* <button onClick={handleAddToCart}>Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
