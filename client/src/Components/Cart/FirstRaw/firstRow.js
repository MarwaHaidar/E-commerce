import React, { useEffect, useState, useContext } from 'react';
import styles from './firstRow.module.css';
import axios from 'axios';
import { BsTrash3Fill } from "react-icons/bs";
import stylebtn from '../Buttons/button.module.css';
import PayButton  from '../PayButton';
import { useCart } from '../cartContext';
//import { CartContext } from '../cartContext';

const ProductItem = ({ item, handleQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [subtotal, setSubtotal] = useState(item.quantity * item.price);
  //const [cartItems, setCartItems] = useState([]);
  const { deleteItem } = useCart();

  const userId = '65c224cca97375578d394636';

  const handleDelete = async () => {
    try {
      await deleteItem(userId, item.productId, item.color, item.size);
      // After successful deletion, update the cart items in the local state
      // You can fetch the updated cart items again or simply remove the deleted item from the local state
      // setCartItems(cartItems.filter(cartItem => cartItem.productId !== item.productId));
      
      // // Fetch the updated cart items after deletion
      // const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/user/getcart`, { withCredentials: true });
      
      // // Update the state with the new cart items
      // const itemsData = response.data;
      // setCartItems(itemsData.data.items); 
      // console.log(itemsData.data.items)
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
//   async function getCard() {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/user/getcart`, { withCredentials: true });
//       const itemsData = response.data;
//       setCartItems(itemsData.data.items); // Update cartItemsData with the latest cart items
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//     }
//   }

// useEffect(() => {
//   getCard();
// }, []);
  

//   const userId = '65a8f6cff242b58ff5272d12';
//   const removeItem = (productId,color,size) => {
//     axios.delete(`http://localhost:5000/cart/user/cart/deleteitem`, { withCredentials: true } {
//       userId,
//       productId,
//       color,
//       size
//     })
//       .then(response => {
//         console.log('Item removed successfully:', response);
//         // Update the wishlistProducts state after item removal
//         setCartItems(cartItems.filter(cartItem => cartItem.productId !== item.productId));
//         // Fetch and update the items count from the backend
//         axios.get(`${process.env.REACT_APP_BASE_URL}/cart/user/getcart`, { withCredentials: true })
//           .then(response => {
//             const count = response.data.result;
//             console.log("Wishlist count:", count);
//             setItemsCount(count);
//             console.log("Items count updated:", count);
//           })
//           .catch(error => {
//             console.error("Error fetching wishlist count:", error);
//             // Handle the error appropriately
//           });
//       })
//       .catch(error => {
//         console.error('Error removing item:', error);
//         // Handle the error appropriately
//       });
//   };

  useEffect(() => {
    setSubtotal(quantity * item.price);
  }, [quantity, item.price]);

  const handleChange = async (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
      handleQuantityChange(item.productId, newQuantity, item.color, item.size);
      console.log(item.color,item.size,newQuantity);

      // Delete item if quantity is zero
      if (newQuantity === 0) {
        try {
          await deleteItem(userId, item.productId, item.color, item.size);
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      }
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
      <button style={{fontSize:'30px'}} onClick={handleDelete} >
        <BsTrash3Fill />
      </button>
     
    </div>
  );
};

const FirstRaw = () => {
  const [cartItemsData, setCartItemsData] = useState([]);
  const { cartItemCount,setCartItemCount } = useCart(); // Using the useCart hook to access context

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
  },[]);

  const handleQuantityChange = async (productId, newQuantity, color, size) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/cart/user/cart/update`, {
        productId:productId,
        quantity: Number(newQuantity),
        color: color,
        size: size,
      },{ withCredentials: true });
      console.log(response.data);
      console.log(newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
    
  };

  return (
    <div className={styles.flashsale}>
      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'white', padding: '10px 0', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', width: '83%' }}>
        <div>Product{cartItemCount}</div>
        <div style={{ paddingLeft: '140px' }}>Color</div>
        <div>Size</div>
        <div>Price</div>
        <div>Quantity</div>
        <div style={{ paddingRight: '90px' }}>SubTotal</div>
      </div>
      {cartItemsData.length > 0 ? cartItemsData.map(item => (
        <ProductItem
          key={item.productId}
          item={item}
          handleQuantityChange={handleQuantityChange}
        />
      ))
       :
        <div>No Products Found!</div>}
             <div style={{ marginTop: '30px', display: 'flex',alignItems: 'center', justifyContent: 'space-between',width: '83%' }}>
      <button
            type="submit"
            className={stylebtn.button}
          >
            Return To Shop
          </button>
          {/* <button
          type="submit"
          className={stylebtn.button}
        >
         CHECKOUT
        </button> */}
        <PayButton cartItems={cartItemsData} />
      </div>
      <div style={{ marginTop: '30px',marginBottom:'100px', display: 'flex',alignItems: 'center',width: '50%'}}>
      <input
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
