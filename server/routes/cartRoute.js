import express from 'express';
import { addToCart, getCart, updateCart, deleteItem,clearitems } from '../controllers/cartcontroller.js';
import { validateToken } from '../Middleware/validateTokenHandler.js';
// import { validateToken } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/cart',validateToken,addToCart);
router.get('/user/getcart/:id',validateToken,getCart);
router.patch('/user/cart/update',validateToken, updateCart);
router.delete('/user/cart/deleteitem',validateToken, deleteItem);
router.delete('/user/cart/clearitems',validateToken, clearitems);

export default router;




