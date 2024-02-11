import React, { useEffect, useState } from 'react';
import styles from './firstRow.module.css';
import axios from 'axios';
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

  const [items, setCartItems] = useState([]);

  async function getCard()
  {
    return await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/cart/user/getcart`,
      withCredentials:true
    })
    .then((response) => {
      const itemsData = response.data;
      return setCartItems(itemsData.data.items);
    })
    .catch(error => console.error("Error fetching cart data:", error));

  }
  useEffect(() => {
    getCard();
  }, []);
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
    {
      items.length>0?items.map((item)=>{
        return <div style={{ marginTop: '30px',display: 'flex', alignItems: 'center',justifyContent:'space-between', padding: '10px', marginBottom: '10px',width:'83%'}}>
        <div>{item.productName}</div>
        <div>{item.color}</div>
        <div>{item.size}</div>
        <div>{item.price+" "+item.currency}</div>
        <div>{item.quantity}</div>
        <div>{item.price+" "+item.currency}</div>
        </div>
      })
      :
      <div>No Products Found!</div>
    }
    </div>

  );
};

export default FirstRaw;

