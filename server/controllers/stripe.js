
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);
import Order from '../models/order.js';
 import Delivery from '../models/delivery.js'; // Import your Delivery model

const calculateTotalStatus = (totalAmount) => {
  if (totalAmount > 100) {
    return totalAmount;
  } else {
    const additionalChargePercentage = 0.15; // 15% of totalAmount
    const additionalCharge = totalAmount * additionalChargePercentage;
    return totalAmount + additionalCharge;
  }
};

const payment = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  // Calculate totalAmount including shipping charge
  const totalAmount = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  // reduce function: The reduce function is an array method used to accumulate a 
  // single result (in this case, the total amount) by iterating over each item in the array.
  // Initial value (0): The reduce function takes an initial value as its second argument (0 in this case). 
  // This initial value is assigned to the total parameter in the first iteration. It's the starting point 
  // for the accumulation.

  // Calculate totalStatus based on the custom logic
  const totalStatus = calculateTotalStatus(totalAmount);

  // Create an order record with status 'unpaid'
  const order = await Order.create({
    userId: req.user._id, // Assuming you have a user associated with the order
    items: cartItems.map((product) => ({
      productId: product._id,
      quantity: product.totalQuantityProducts,
    })),
    totalAmount: totalAmount,
    TotalStatus: totalStatus,
    status: 'unpaid', // Set the initial order status
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
  });

  // Map cart items to Stripe line items
  const Line_items = cartItems.map((product) => {
    return {
      price_data: {
        currency: product.currency,
        product_data: {
          name: product.name,
          imageCover: product.imageCover,
          desc: product.desc,
          discountPercentage: product.discountPercentage,
          metadata: {
            id: product._id,
            orderId: order._id, // Include the orderId in metadata for reference
          },
        },
        price: product.price * 100, // Convert to cents for Stripe
      },
      quantity: product.totalQuantityProducts,
    };
  });

  // Create a Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: Line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  // Update the order record with the Stripe session ID and set status to 'paid'
  await Order.findByIdAndUpdate(order._id, {
    status: 'paid',
    stripeSessionId: session.id,
  });

  // Create a delivery record in your Delivery model
  const delivery = await Delivery.create({
    order_id: order._id,
    status: 'pending', // Set the initial delivery status// if current date<delivery date then pending 
    user_id:req.user.id,
    address:req.user.id,
    //deliverydate date of creation of order where status: paid+10 days

  });

  res.send({ url: session.url });
});

export { payment };
