import React, { useEffect, useState, useContext } from 'react';
import styles from './firstRow.module.css';
import axios from 'axios';
import { BsTrash3Fill } from "react-icons/bs";
import stylebtn from '../Buttons/button.module.css';
import { useCart } from '../cartContext';
import PayButton from '../PayButton.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { CartContext } from '../cartContext';

const ProductItem = ({ item, handleQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [subtotal, setSubtotal] = useState(item.quantity * item.price);
  const [quantitySizes, setQuantitySizes] = useState(null);
  //const [cartItems, setCartItems] = useState([]);
  const { deleteItem } = useCart();


  const handleDelete = async () => {
    try {
      await deleteItem(item.productId, item.color, item.size);

    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  ///////// Check if the selected product is in stock/////////////////////////////////////////
  useEffect(() => {
    async function fetchStockQuantity() {
      try {
        const response = await axios.post(`http://localhost:5000/products/productQuantity`, {

          id: item.productId,
          size: item.size,
          color: item.color
        });
        const quantitySizes = response.data.quantity;
        setQuantitySizes(quantitySizes);
        console.log('Sizequantity:', quantitySizes); // Corrected console.log
      } catch (error) {
        console.error('Error fetching stock quantity:', error);
      }
    }
    fetchStockQuantity();
  }, []);


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {
    setSubtotal(quantity * item.price);
  }, [quantity, item.price]);

  const handleChange = async (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
      handleQuantityChange(item.productId, newQuantity, item.color, item.size);
      console.log(item.color, item.size, newQuantity);

    }
  };

  return (
    <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', width: '83%' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div >{item.image && <img src={item.image} alt={item.productName} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} />}</div>
        <div style={{ marginTop: '30px', width: "160px" }}>{item.productName}</div>
      </div>
      <div style={{ backgroundColor: item.color, width: '40px', height: '40px', borderRadius: '50%', justifyContent: "center" }}></div>
      <div style={{ width: "10%px", textAlign: "center" }}>{item.size}</div>
      <div style={{ width: "7%" }}>{item.price + " " + item.currency}</div>
      <div style={{ width: "8%" }}>
        <input
          style={{ width: '50px', textAlign: 'center', border: '2px solid black' }}
          type="number"
          value={quantity}
          min="1"
          max={quantitySizes}
          onChange={handleChange}
        />
      </div>
      <div style={{ width: "8%", textAlign: 'center' }}>${subtotal.toFixed(2)}</div>
      <button style={{ fontSize: '30px' }} onClick={handleDelete} >
        <BsTrash3Fill />
      </button>

    </div>
  );
};

const FirstRaw = () => {
  const [cartItemsData, setCartItemsData] = useState([]);
  const { cartItemCount, setCartItemCount } = useCart(); // Using the useCart hook to access context

  async function getCard() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/user/getcart`, { withCredentials: true });
      const itemsData = response.data;
      const count = response.data.result;
      console.log("Cart count:", count);
      setCartItemsData(itemsData.data.items); // Update cartItemsData with the latest cart items
      setCartItemCount(count);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  useEffect(() => {
    getCard();
  }, []);

  const handleQuantityChange = async (productId, newQuantity, color, size) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/cart/user/cart/update`, {
        productId: productId,
        quantity: Number(newQuantity),
        color: color,
        size: size
      }, { withCredentials: true });
      console.log(response.data);
      console.log(newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }

  };
  //////////// clear the cart////////////////////////////////////////
  const handleClearCart = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cart/user/cart/clearitems`,
        { withCredentials: true }
      );
      toast.success('The cart deleted successfully!');
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  /////////////////////////////////////////////////////////////////////////////

  return (
    <div className={styles.flashsale}>
      <ToastContainer />
      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'white', padding: '10px 0', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', width: '83%', marginRight: "20px" }}>
        <div>Product{cartItemCount}</div>
        <div style={{ paddingLeft: '120px' }}>Color</div>
        <div style={{ paddingRight: '20px' }}>Size</div>
        <div style={{ paddingRight: '30px' }}>Price</div>
        <div style={{ paddingRight: '30px' }}>Quantity</div>
        <div style={{ paddingRight: '90px' }}>SubTotal</div>
      </div>
      {cartItemsData.length > 0 ? cartItemsData.map(item => (
        <ProductItem
          key={item.productId}
          item={item}
          handleQuantityChange={handleQuantityChange}
          quantitySizes={item.quantitySizes}
        />
      ))
        :
        <div>No Products Found!</div>}
      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '83%' }}>
        <button style={{ marginLeft: '0' }}
          type="submit"
          className={stylebtn.button}
        >
          Return To Shop
        </button>
        <button
          type="button"
          className={stylebtn.button}
          onClick={handleClearCart}
        >
          CLear Cart
        </button>
        {/* <button
          type="submit"
          className={stylebtn.button}
        >
         CHECKOUT
        </button> */}
        <PayButton cartItems={cartItemsData} />
      </div>
      <div style={{ marginTop: '30px', marginBottom: '100px', display: 'flex', alignItems: 'center', width: '50%' }}>
        <input style={{ marginLeft: '0' }}
          type="text"
          placeholder="Coupon Code"
          className={stylebtn.couponcode}
        />
        <button
          type="submit"
          className={stylebtn.couponbutton}
        >
          Apply Coupon
        </button>
      </div>

    </div>


  );
};

export default FirstRaw;