import express from 'express';
import {getorders,getorder,getorderInDetails,getHistoryOrderUser} from '../controllers/ordercontrollers.js';
import {calculateQuantity} from '../Middleware/RecalculateQu.js'
import { validateToken,validateTokenForAdmin } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

// router.post('/user/order',validateToken,createOrder,calculateQuantity);
router.get('/orders',validateToken,getorders);
router.get('/orders/:id',validateToken,validateTokenForAdmin,getorder)
// router.put('/admin/orders/:id',updateorder)
// router.delete('/admin/orders/:id',deleteorder)
router.get('/orderInDetails/:id',validateToken,validateTokenForAdmin,getorderInDetails);
router.get('/user/historyorder/:id',validateToken,validateTokenForAdmin,getHistoryOrderUser)

export default router;




