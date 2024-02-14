//import { ObjectId } from "mongodb";
import Cart from "../models/cart.js";
import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';
import { Types } from 'mongoose';

const { ObjectId } = Types;
// import { validateToken } from '../Middleware/validateTokenHandler.js';



// add to cart
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  const product = await Product.findById(productId).exec();
  const productName = product.name;
  const price = product.price;
  const color = req.body.color;
  const size = req.body.size;
  const image = product.imageCover;
  const quantity = req.body.quantity;
  const currency = req.body.currency;
  const items = [{
      productId,
      productName,
      image,
      quantity,
      size,
      color,
      price,
      currency
  }];

  let cart = await Cart.findOne({ userId});
  try {
      if (!cart) {
          cart = await Cart.create({ userId, items });
          res.status(201).json({ cart });
          console.log("Created :", cart);
      } else {
          const productExists = cart.items.some(item =>
              item.productId.equals(productId) &&
              item.color === color &&
              item.size === size
          );

          if (productExists) {
              const existingItem = cart.items.find(item =>
                  item.productId.equals(productId) &&
                  item.color === color &&
                  item.size === size
              );
              existingItem.quantity += 1; // Increment quantity
              await cart.save();
              const message = `${existingItem.quantity} of ${productName} added to your cart`;
              res.status(200).json({ message, cart });
          } else {
              cart.items.push(...items);
              await cart.save();
              res.json({ message: "New item added", cart });
          }
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
});

export { addToCart };



// get user cart
const getCart = asyncHandler(async (req, res) => {
  console.log("Hello world");
  try {
    let cart = await Cart.findOne({ userId:req.user.id }); // No need for additional conversion

    if (!cart) {
      // Handle case where cart is not found for the user
      return res.status(400).json({ message: "Cart not found" });
    }

    let count = cart.items.length;
    res.status(200).json({ result: count, data: cart });
  } catch (error) {
    console.error(error);
    console.log(userid)
    res.status(500).json({ message: "Internal server error" });
  }
});

export { getCart };


// update Products quantity

const updateCart = asyncHandler(async (req, res) => {
    const { productId, quantity, color, size } = req.body;
    const userId = req.user.id;
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId, 'items.productId': productId, 'items.color':color,'items.size':size },
        { $set: { 'items.$.quantity': quantity } },
        { new: true }
      );
      

      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart not found or product not in cart' });
      }

      res.status(200).json({ message: 'Quantity updated successfully', data: updatedCart });
      console.log(userId);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export { updateCart };



// delete a product from cart
const deleteItem = async (req, res) => {
    const { userId, productId, color, size } = req.body;

    try {
      const newCart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId, color, size } } },
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

const clearitems = async (req, res) => {
  const { userId } = req.body;

  try {
    const newCart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }, // Set the 'items' array to an empty array
      { new: true }
    );

    if (!newCart) {
      return res.status(404).json({ message: 'Cart not found or already empty' });
    }

    res.status(200).json({ message: 'Cart cleared successfully', data: newCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { clearitems };
