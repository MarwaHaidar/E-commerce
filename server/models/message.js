
import { Schema,model } from 'mongoose';



const messageSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, 
             ref: 'User', 
             required: true },
  name: { type: String,
          required: true },
  email: { type: String,
          required: true },
  text: { type: String,
          required: true },
  screenshot: { type: String},
  timestamp: { type: Date, 
               default: Date.now },
});

const Message =model('Message', messageSchema);

export default Message;