import express from 'express';
import { addToWishlist, getWishcart, removeWishItem } from '../controllers/wishlistcontroller.js';
import { validateToken } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/wishlist', validateToken, addToWishlist);
router.patch('/user/wishlist/remove-item', validateToken, removeWishItem);
router.get('/user/wishlist/:id', validateToken, getWishcart);
// router.delete('/user/cart/delete', deleteItem);

export default router;




