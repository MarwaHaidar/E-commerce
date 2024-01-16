import express from 'express';
import { createReview } from '../controllers/reviewcontroller.js';

const router = express.Router();

router.post('/user/review', createReview)



export default router;