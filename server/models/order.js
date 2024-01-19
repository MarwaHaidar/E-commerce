
import {Schema,model} from 'mongoose';


const orderSchema = new Schema({
  userId: {
     type: Schema.Types.ObjectId,
      ref: 'User'
     },
  
    productDetails: [
      { //product_id
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, 
                    required: true, 
                    min: 1 ,
                    default:1,
                  },
      },
    ],

    subtotal:{ type:Number,
              required:true,
              min:0},
    
    totalAmount: { type: Number, 
      required: true,
       min: 0 },
       
    status: {
      type: String,
      enum: ['paid', 'unpaid'],
      
    }
  },{timestamps:true});
  
  const Order = model('Order', orderSchema);
  
  export default Order;