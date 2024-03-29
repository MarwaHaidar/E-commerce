import Wishlist from "../models/wishlist.js";
import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';
// import { validateToken } from '../Middleware/validateTokenHandler.js';



// add to wish list
const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  const product = await Product.findById(productId).exec();
  console.log("found product: ", product)
  const productName = product.name;
  const image = product.imageCover;
  const wishlist = [{
    productId,
    productName,
    image
  }];
  console.log(wishlist)
  let wishCart = await Wishlist.findOne({ userId });
  console.log("wishcart:", wishCart)
  try {
    if (!wishCart) {
      wishCart = await Wishlist.create({ userId, wishlist });
      res.status(201).json({ wishCart: wishCart });
      console.log("Created :", wishCart)
    } else {
      const productExists = wishCart.wishlist.some(el => el.productId.equals(productId));
      if (productExists) {
        res.status(409).json({ product: productId, message: "Already in your Wish Cart"});
        return; // Return here to prevent further execution
      } else {
        wishCart.wishlist.push(...wishlist);
        await wishCart.save();
        console.log("saved", wishCart)
        res.status(201).json({ "new item added": wishCart });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
export { addToWishlist };



// get user wish cart
const getWishcart = asyncHandler(async (req, res) => {
  try {
    // const { userId } = req.params;
    const userId = req.user.id;
    console.log(userId)
    let WishCart = await Wishlist.findOne({ userId: userId });
    let count = WishCart.wishlist.length
    res.status(200).json({ result: count, data: WishCart });
  } catch (error) {
    console.error(error)
  }
});


export { getWishcart };






// remove items from wish cart
const removeWishItem = async (req, res) => {
  const userId = req.user.id
  console.log(userId)
  const { productId } = req.body;


  try {
    const newWishCart = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { wishlist: { productId } } },
      { new: true }
    );

    if (!newWishCart) {
      return res.status(404).json({ message: 'wish cart not found or product not in cart' });
    }

    res.status(200).json({ message: 'Item has been removed from wish cart', data: newWishCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { removeWishItem };

