import express from 'express';
import { addToCart } from '../controllers/cartcontroller.js';
import { validateToken } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/cart', addToCart);
// router.get('/orders',getorders);
// router.get('/orders/:id',getorder);
// router.put('/admin/orders/:id',updateorder)
// router.delete('/admin/orders/:id',deleteorder)

export default router;




