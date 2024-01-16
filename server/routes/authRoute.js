import express from 'express';
import { registeruser,loginuser,currentuser } from '../controllers/authcontroller.js';

const router=express.Router();

router.post('/register',registeruser)
router.post('/login',loginuser)


router.post('/current',currentuser)





export default router;