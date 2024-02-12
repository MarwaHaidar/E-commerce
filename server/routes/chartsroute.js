import express from 'express';
import  {getProductCount}  from '../controllers/Chartcontrollers.js';

const router = express.Router();

router.get('/productcount', getProductCount);


export default router;