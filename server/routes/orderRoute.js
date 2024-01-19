import express from 'express';
import {createOrder,getorders,getorder,getorderInDetails,updateorder,deleteorder,getHistoryOrderUser} from '../controllers/ordercontrollers.js';

const router = express.Router();

router.post('/user/order',createOrder);
router.get('/orders',getorders);
router.get('/orders/:id',getorder)
router.put('/admin/orders/:id',updateorder)
router.delete('/admin/orders/:id',deleteorder)
router.get('/orderInDetails/:id',getorderInDetails);
router.get('/user/historyorder/:id',getHistoryOrderUser)

export default router;



