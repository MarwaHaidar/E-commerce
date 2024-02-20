import React from 'react'
import checkoutImg from '../Assets/checkout-success.png'

const CheckoutSuccess = () => {
  return (
    <div class="relative p-20">
      <img src={checkoutImg} alt="Checkout Image" class="mx-auto"></img>
      <div class="absolute top-5  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 class="text-custom text-2xl">You've checked-out successfully</h2>
      </div>
    </div>


  )
}

export default CheckoutSuccess
