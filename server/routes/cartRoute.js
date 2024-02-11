import express from 'express';
import { addToCart, getCart, updateCart, deleteItem,clearitems } from '../controllers/cartcontroller.js';
import { validateToken } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/cart',validateToken,addToCart);
router.get('/user/getcart',validateToken,getCart);
router.patch('/user/cart/update', updateCart);
router.delete('/user/cart/deleteitem', deleteItem);
router.delete('/user/cart/clearitems', clearitems);

export default router;




