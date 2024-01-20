import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);
import Order  from '../models/order';








const calculateTotalStatus = (totalAmount) => {
  if (totalAmount > 100) {
    return totalAmount;
  } else {
    const shippingPercentage = 0.15; // 15% of totalAmount
    const additionalCharge = totalAmount * shippingPercentage;
    return totalAmount  + additionalCharge;
  }
};

const payment = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;
//   const shippingCharge = 5; // Assuming a fixed shipping charge, you can adjust this based on your logic

  // Calculate totalAmount including shipping charge
  const totalAmount = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0) ;

  // Calculate totalStatus based on the custom logic
  const totalStatus = calculateTotalStatus(totalAmount, shippingCharge);

  // Create an order record with status 'unpaid'
  const order = await Order.create({
    userId: req.user._id, // Assuming you have a user associated with the order
    items: cartItems.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
    })),
    totalAmount: totalAmount,
    TotalStatus: totalStatus,
    status: 'unpaid', // Set the initial order status
    dateOrdered:{
        type:Date,
        default:Date.now,
      }
  });

  // Map cart items to Stripe line items
  const Line_items = cartItems.map((product) => {
    return {
      price_data: {
        currency: product.currency,
        product_data: {
          name: product.productName,
          imageCover: product.imageCover,
          desc: product.desc,
          discountPercentage: product.discountPercentage,
          metadata: {
            id: product.productId,
            orderId: order._id, // Include the orderId in metadata for reference
          },
        },
        price: product.price * 100, // Convert to cents for Stripe
      },
      quantity: product.quantity,
    };
  });

  // Create a Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: Line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  // Update the order record with the Stripe session ID
  await Order.findByIdAndUpdate(order._id, {
    status: 'paid', // Update status to 'paid' after successful payment
    stripeSessionId: session.id,
  });

  // Update the order record with the Stripe session ID
  await Order.findByIdAndUpdate(order._id, {
    status: 'paid', // Update status to 'paid' after successful payment
    stripeSessionId: session.id,
  });
  // Create a delivery record in your Delivery model
  const delivery = await Delivery.create({
    orderId: order._id,
    status: 'pending', // Set the initial delivery status
    // ... other details for delivery record
  });


  res.send({ url: session.url });
});

export { payment };


















