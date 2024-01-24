import express from 'express';
import { createReview,getreviews,getreview,updatereview,deletereview} from '../controllers/reviewcontroller.js';
import { validateToken,validateTokenForAdmin } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/review',validateToken,createReview)
router.get('/reviews',getreviews)
router.get('/reviews/:id',getreview)
router.put('/user/reviews/:id',updatereview)
router.delete('/reviews/:id',deletereview)



export default router;


