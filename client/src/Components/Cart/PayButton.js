import React from 'react';
import axios from 'axios';
import stylebtn from './Buttons/button.module.css';


const PayButton = ({ cartItems }) => {
    const handleCheckout = () => {
        console.log(cartItems)
        // Assuming your server endpoint for Stripe is at http://localhost:5000/stripe
        axios.post('http://localhost:5000/stripe/stripecheckoutsession', { cartItems }, { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    window.location.href = res.data.url; // Assuming res.data contains the URL
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
   

    return (
        <button className={stylebtn.button} onClick={handleCheckout}>Check Out</button>
    );
};

export default PayButton;
