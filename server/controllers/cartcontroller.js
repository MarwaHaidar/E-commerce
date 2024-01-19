import Cart from "../models/cart.js";
import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';
// import { validateToken } from '../Middleware/validateTokenHandler.js';



// add to cart
const addToCart = asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const product = await Product.findById(productId).exec();
    const productName = product.name;
    const price = product.price;
    const quantity = req.body.quantity;
    const currency = req.body.currency;
    const items = [{
        productId,
        productName,
        quantity,
        price,
        currency
    }]
    let cart = await Cart.findOne({ userId });
    try {
        if (!cart) {
            cart = await Cart.create({ userId, items });
            res.status(201).json({ cart: cart });
            console.log("Created :", cart)
        }
        else {
            const productExists = cart.items.some(item => item.productId.equals(productId));

            if (productExists) {
              const existingItem = cart.items.find(item => item.productId.equals(productId));
              let newQuantity = existingItem.quantity += 1;
              await cart.save();
              const message = `${newQuantity} of ${productName} added to your cart`;
              res.status(200).json({ message: message, cart: cart });
            } else {
                cart.items.push(...items);
                await cart.save();
                res.json({ "new item added": cart });
            }
        }
    } catch (error) {
        console.error(error)
    }
});
export { addToCart };


// get user cart
const getCart = asyncHandler(async (req, res) => {
try {
      const { userId } = req.params;
      let cart = await Cart.findOne({ id: userId });
      res.status(200).json({ data: cart });
} catch (error) {
    console.error(error)
}
});


export { getCart };


// update Products quantity

const updateCart = asyncHandler(async (req, res) => {
    const { userId, productId, newQuantity } = req.body;

    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId, 'items.productId': productId },
        { $set: { 'items.$.quantity': newQuantity } },
        { new: true }
      );
  
      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart not found or product not in cart' });
      }
  
      res.status(200).json({ message: 'Quantity updated successfully', data: updatedCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export { updateCart };



// delete a product from cart
const deleteItem = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const newCart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } },
        { new: true }
      );
  
      if (!newCart) {
        return res.status(404).json({ message: 'Cart not found or product not in cart' });
      }
  
      res.status(200).json({ message: 'Product deleted from cart successfully', data: newCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
export  { deleteItem };

