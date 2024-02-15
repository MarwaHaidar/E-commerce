import express from 'express';
import Stripe from 'stripe';
import Order from '../models/order.js'
import Delivery from '../models/delivery.js';
import { validateToken } from '../Middleware/validateTokenHandler.js';
//import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';


// const newObjectId = new ObjectId();

import dotenv from 'dotenv';
dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/stripecheckoutsession",validateToken, async (req, res) => {
    const cartItems = req.body.cartItems;
    const truncatedCartItems = JSON.stringify(cartItems).slice(0, 500); // Truncate JSON string to the first 500 characters
    
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user.id,
        cart: truncatedCartItems,
      },
    });

  const line_items = req.body.cartItems.map((item) => {
    return {
     price_data: {
      currency: "usd",
      product_data: {
        name: item.productName, // Ensure that each item has a productName property
        images: [item.image],
        description: item.description,
        metadata: {
          id: item.productId,
        },
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  };
  });
  /*A Checkout Session represents the details and configuration for a customer's purchase,
   including the items they are buying, the payment method they are using, and additional 
   settings such as shipping options, phone number collection, and URLs to redirect the 
   customer after successful or canceled payments.*/ 

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE","LB"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
});

// Create order function

const createOrder = async (customer, data) => {
  try {
    console.log(customer.metadata.cart);
    const Items = JSON.parse(customer.metadata.cart);
   
    // Convert product IDs to ObjectIDs
    const orderItems = Items.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));
    
    // Create a new instance of the Order model
    const newOrder = new Order({
      userId: customer.metadata.userId,
      orderItems: orderItems,
      totalAmount: data.amount_subtotal,
      totalStatus: data.amount_total, // Correct the property name
      dateOrdered: new Date(),
    });

    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);

    // Call createDelivery function after saving the order
    await createDelivery(customer, data, savedOrder._id);
  } catch (err) {
    console.error("Error saving order:", err);
  }
};

// Create delivery function
const createDelivery = async (customer, data, orderId) => {
  try {
    // Calculate delivery date based on shipping option
    const subtotal = data.amount_subtotal;
    const total = data.amount_total;

    let deliveryDate;
    if (subtotal == total) {
      deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7);
    } else {
      deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 1);
    }

    // Generate a random tracking number
    const trackingNumber = Math.floor(Math.random() * 1000000000);

    const newDelivery = new Delivery({
      order_id: orderId,
      user_id: customer.metadata.userId,
      customerId: data.customer,
      shipping: data.customer_details,
      deliveryDate: deliveryDate,
      status: "pending",
      trackingNumber: trackingNumber.toString(),
    });

    const savedDelivery = await newDelivery.save();
    console.log("Processed Delivery:", savedDelivery);

    // Update order status to "Delivered" when current date matches delivery date
    const order = await Order.findOneAndUpdate(
      { _id: orderId }, // Assuming orderId is the order ID
      { $set: { status: 'Delivered' } },
      { new: true }
    );

    if (order) {
      console.log(`Order ${order._id} status updated to Delivered`);
    } else {
      console.log(`Order not found`);
    }
  } catch (err) {
    console.log(err);
  }
};

//webhook
router.use(express.raw({ type: 'application/json' }));

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_59251888c1727ed55aeb433e08faf8bce8bafca4b038248ed014610b9abba5c9";

// Configure the endpoint to handle raw JSON request bodies
router.post("/webhook", async (req, res) => {
    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
  
    let event;
    try {
      event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
      console.log(`Webhook Verified: `, event);
    } catch (err) {
      console.log(`Webhook Error: ${(err).message}`);
      res.status(400).send(`Webhook Error: ${(err).message}`);
      return;
    }
  
    // Extract the object from the event.
    const data = event.data.object;
    const eventType = event.type;
  //---------------------------------------------------------------------
 
  
  //*******************************************************************

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            //CREATE ORDER and delivery
             createOrder(customer, data);
             console.log("success")
           
            createDelivery(customer, data);
          } catch (err) {
            console.log(typeof createOrder);
            console.log(typeof createDelivery);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }
  
    res.status(200).end();
  });
  



export default router
