import express from 'express';
import {createCurrency,getcurrencies,getcurrency,updatecurrency ,deletecurrency} from '../controllers/currencycontrollers.js'

const router = express.Router();

router.post('/admin/currency',createCurrency);
router.get('/currencies',getcurrencies );
router.get('/currencies/:id',getcurrency);
router.put('/admin/currencies/:id',updatecurrency);
router.delete('/admin/currencies/:id',deletecurrency);



export default router;