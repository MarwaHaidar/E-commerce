import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';



const paymentSchema = new Schema({
  payment_id: { type: Number, 
               required: true, 
               unique: true },
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
// Initialize the auto-increment plugin
autoIncrement.initialize(mongoose.connection);

// Apply the auto-increment plugin to your schema
paymentSchema.plugin(autoIncrement.plugin, { model: 'Payment', field: 'payment_id', startAt: 1 });


const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
