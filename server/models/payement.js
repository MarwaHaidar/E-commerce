
import {Schema,model} from 'mongoose';




const paymentSchema = new Schema({
 
  order_id: { type: Schema.Types.ObjectId, 
             ref: 'Order', 
             required: true },
  user_id: { type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true },
  amount: { type: Number, 
           required: true, 
           min: 0 },
  paymentMethod: { type: String, 
                   required: true,
                   enum: ['cash on delivery', 'visa'], },
  paymentDate: { type: Date, default: Date.now },
  status: { type: String, 
           required: true, 
           enum: ['pending', 'success', 'failed'] }, // Adjust status values as needed
});


const Payment = model('Payment', paymentSchema);

export default Payment;
