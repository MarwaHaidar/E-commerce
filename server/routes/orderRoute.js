import express from 'express';
import {getorders,getorder,getorderInDetails,getHistoryOrderUser} from '../controllers/ordercontrollers.js';
import {calculateQuantity} from '../Middleware/RecalculateQu.js'
import { validateToken,validateTokenForAdmin } from '../Middleware/validateTokenHandler.js';
import Order from '../models/order.js';
// import createOrder from '../controllers/stripe.js'
const router = express.Router();

router.post("/user/order", validateToken, async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).send(savedOrder);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// router.post('/user/order',validateToken,createOrder,calculateQuantity);
router.get('/orders',validateToken,getorders);
router.get('/orders/:id',validateToken,validateTokenForAdmin,getorder)
// router.put('/admin/orders/:id',updateorder)
// router.delete('/admin/orders/:id',deleteorder)
router.get('/orderInDetails/:id',validateToken,validateTokenForAdmin,getorderInDetails);
router.get('/user/historyorder/:id',validateToken,validateTokenForAdmin,getHistoryOrderUser)

export default router;




