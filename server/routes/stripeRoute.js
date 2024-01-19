import express from 'express';

import {payment} from '../controllers/stripe.js';
import { validateToken } from '../Middleware/validateTokenHandler.js';


const router=express.Router();



// Asynchronous route for creating a checkout session
router.post('/create-checkout-session', payment)

export default router;