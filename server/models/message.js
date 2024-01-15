
import { Schema,model } from 'mongoose';



const messageSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, 
             ref: 'User', 
             required: true },
  text: { type: String, 
          required: true },
  timestamp: { type: Date, 
               default: Date.now },
});

const Message =model('Message', messageSchema);

export default Message;