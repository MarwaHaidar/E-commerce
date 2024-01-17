
import {Schema,model} from 'mongoose';


const orderSchema = new Schema({
  userId: {
     type: Schema.Types.ObjectId,
      ref: 'User'
     },
  
    productDetails: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, 
                    required: true, 
                    min: 1 ,
                    default:1,
                  },
      },
    ],
    
    totalAmount: { type: Number, 
      required: true,
       min: 0 },
       
    status: {
      type: String,
      enum: ['shipped', 'delivered'],
      
    }
  },{timestamps:true});
  
  const Order = model('Order', orderSchema);
  
  export default Order;