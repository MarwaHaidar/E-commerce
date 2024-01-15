
import {Schema,model} from mongoose;


const deliverySchema = new Schema({

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

  const Delivery = model('Delivery', deliverySchema);
  
  export default Delivery;