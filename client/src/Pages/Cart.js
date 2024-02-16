import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FirstRow from '../Components/Cart/FirstRaw/firstRow';
import ProductCard from '../Components/Cart/SecondRow/productCart';
//import ButtonLayout from '../Components/Cart/Buttons/button';
import CartTotal from '../Components/Cart/CartTotal/cartTotal';
import zara1 from '../Components/Assets/zara11.png';

const Cart = () => {

  return (

    <div>
      <div className="text-3xl font-bold test" style={{ marginLeft: '150px' }}>My shopCart</div>

      <FirstRow />
    </div>
  );
}

export default Cart;

