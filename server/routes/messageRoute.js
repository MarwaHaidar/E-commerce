import express from 'express';
import { sendMessage, getMessages, getMessage } from '../controllers/messagecontroller.js';
import upload from '../controllers/imageuploadcontroller.js';
import { validateToken,validateTokenForAdmin } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/message',validateToken, upload.single("screenshot"), sendMessage);
router.get('/admin/messages/:id',validateToken,validateTokenForAdmin, getMessage);
router.get('/admin/messages',validateToken,validateTokenForAdmin,getMessages);

export default router;




