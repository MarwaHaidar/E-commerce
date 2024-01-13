import mongoose from 'mongoose';
import {Schema,model} from mongoose;
import autoIncrement from 'mongoose-auto-increment';

const deliverySchema = new Schema({
    delivery_id: { type: Number, 
                  required: true, 
                  unique: true },
    order_id: { type: Schema.Types.ObjectId, 
                ref: 'Order', 
                required: true },
    user_id: { type: Schema.Types.ObjectId, 
               ref: 'User', 
               required: true },
    deliveryAddress: { type: String, 
                       required: true },
    deliveryDate: { type: Date },// comparison between current date and this date where it should be the date of receiving the product
    //if the currDate()<Date:status:shipped else:delivered
    status: { type: String, 
              required: true, 
              enum: ['shipped', 'delivered'] },
    trackingNumber: { type: String },
  });
  // Initialize the auto-increment plugin
  autoIncrement.initialize(mongoose.connection);

  // Apply the auto-increment plugin to your schema
  deliverySchema.plugin(autoIncrement.plugin, { model: 'Delivery', field: 'delivery_id', startAt: 1 });

  const Delivery = mongoose.model('Delivery', deliverySchema);
  
  export default Delivery;