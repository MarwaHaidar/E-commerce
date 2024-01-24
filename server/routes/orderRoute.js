import express from 'express';
import {createOrder,getorders,getorder,getorderInDetails,updateorder,deleteorder,getHistoryOrderUser} from '../controllers/ordercontrollers.js';
import {calculateQuantity} from '../Middleware/RecalculateQu.js'

const router = express.Router();

router.post('/user/order', async (req, res, next) => {
    try {
         // Call createOrder first
        await createOrder(req, res, next);

        // Then call calculateQuantity
        await calculateQuantity(req, res, next);
    } catch (error) {
        console.error('Error processing order:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// router.post('/user/order',createOrder,calculateQuantity);
router.get('/orders',getorders);
router.get('/orders/:id',getorder)
router.put('/admin/orders/:id',updateorder)
router.delete('/admin/orders/:id',deleteorder)
router.get('/orderInDetails/:id',getorderInDetails);
router.get('/user/historyorder/:id',getHistoryOrderUser)

export default router;




