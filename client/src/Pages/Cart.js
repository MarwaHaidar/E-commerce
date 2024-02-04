import React from 'react';
import FirstRaw from '../Components/Cart/FirstRaw/firstRow';
import ProductCard from '../Components/Cart/SecondRow/productCart';
import ButtonLayout from '../Components/Cart/Buttons/button';
import CartTotal from '../Components/Cart/CartTotal/cartTotal';
import zara1 from '../Components/Assets/zara11.png'

const Cart = () => {
  return (
    <div>
        <div className="text-3xl font-bold test" style={{marginLeft:'110px'}}>My shopCart</div>
        <FirstRaw
        />
        <ProductCard
        imageSrc={zara1}
        name="Product Name"
        price="$19.99"
        subTotal="$19.99"
      />
      <ProductCard
        imageSrc={zara1}
        name="Product Name"
        price="$19.99"
        subTotal="$19.99"
      />
      <ButtonLayout
      />
      <CartTotal
      />



      
    </div>
  )
}

export default Cart
