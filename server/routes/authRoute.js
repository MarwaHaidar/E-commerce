import express from 'express';
import { registeruser,registerverification } from '../controllers/register.js';
import { loginuser,currentuser } from '../controllers/login.js';
import { validateToken } from '../Middleware/validateTokenHandler.js';
import { requestPasswordReset,resetPassword } from '../controllers/forgetpass.js';

const router=express.Router();

router.post('/register',registeruser)
router.get('/registerverify', registerverification)
router.post('/login',loginuser)
router.use(validateToken);
router.get('/current',currentuser)
router.post('/resetpassverify',requestPasswordReset)
router.post('/resetpass',resetPassword)





export default router;