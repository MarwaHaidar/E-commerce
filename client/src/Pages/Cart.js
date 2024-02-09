import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FirstRow from '../Components/Cart/FirstRaw/firstRow';
import ProductCard from '../Components/Cart/SecondRow/productCart';
import ButtonLayout from '../Components/Cart/Buttons/button';
import CartTotal from '../Components/Cart/CartTotal/cartTotal';
import zara1 from '../Components/Assets/zara11.png';

const Cart = () => {
  const [items, setCartItems] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:5000/user/cart`
    })
      .then((response) => {
        const itemsData = response.data.items;
        setCartItems(itemsData);
      })
      .catch(error => console.error("Error fetching cart data:", error));
  }, []);

  return (
    <div>
      <div className="text-3xl font-bold test" style={{ marginLeft: '110px' }}>My shopCart</div>
      <FirstRow />
      {items.map((item) => (
        <ProductCard key={item._id} cartItem={item} />
      ))}
      <ButtonLayout />
      <CartTotal />
    </div>
  );
}

export default Cart;

