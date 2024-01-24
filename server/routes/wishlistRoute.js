import express from 'express';
import { addToWishlist, getWishcart, removeWishItem } from '../controllers/wishlistcontroller.js';
// import { validateToken } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/wishlist', addToWishlist);
router.get('/user/wishlist/:id', getWishcart);
router.patch('/user/wishlist/remove-item', removeWishItem);
// router.delete('/user/cart/delete', deleteItem);

export default router;




