
import Message from '../models/message.js';
import User from '../models/user.js'
import asyncHandler from 'express-async-handler';
import { uploadImage } from "./imageuploadcontroller.js"


//  send  a message (verified users only)
const sendMessage = asyncHandler(async (req, res) => {
    try {
        const user_id = req.body.userId;
        const text = req.body.text
        const screenshot = await uploadImage(req.file.buffer);
        const user = await User.findById(user_id)
        const name = user.first_name;
        const email = user.email;

        const message = await Message.create({ user_id, name, email, text, screenshot });
        res.status(201).json({ message: message });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { sendMessage };


// Get all messages (admins only)

const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find();
    res.status(200).json({ result: messages.length, data: messages });
});


export { getMessages };

// Get a specific message (admins only)
const getMessage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
        res.status(404).json({ msg: `Couldn't find the requested message` })
    }
    res.status(200).json({ message: message })
})

export { getMessage };

