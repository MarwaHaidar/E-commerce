import express from 'express';
import { sendMessage, getMessages, getMessage } from '../controllers/messagecontroller.js';
import upload from '../controllers/imageuploadcontroller.js';
// import { validateToken } from '../Middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/user/message', upload.single("screenshot"), sendMessage);
router.get('/admin/messages/:id', getMessage);
router.get('/admin/messages', getMessages);

export default router;




