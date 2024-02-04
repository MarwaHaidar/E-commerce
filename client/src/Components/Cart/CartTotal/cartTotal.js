import React from 'react';
import styles from './cartTotal.module.css';

const CartTotal = () => {
  return (
    <div style={{ border: '2px solid black', padding: '10px', borderRadius: '5px',width:'30%',height:'300px',marginLeft:'54%', marginTop:'-41px'}}>
    <span>Cart Total</span>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h1>SubTotal:</h1>
    <h1>128$</h1>
    </div>
    <hr></hr>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h1>Shipping:</h1>
    <h1>Free</h1>
    </div>
    <hr></hr>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <h1>Total:</h1>
    <h1>128$</h1>
    </div>
    <button
    type="submit"
    className={styles.button}
    >
    Process To Checkout
    </button>

    </div>
  );
};

export default CartTotal;