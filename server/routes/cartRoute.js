import express from 'express';
import { addToCart, getCart, updateCart, deleteItem } from '../controllers/cartcontroller.js';
// import { validateToken } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/cart', addToCart);
router.get('/user/cart/:id', getCart);
router.put('/user/cart/update', updateCart);
router.delete('/user/cart/delete', deleteItem);

export default router;




