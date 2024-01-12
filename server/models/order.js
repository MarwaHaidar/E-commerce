import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';


const orderSchema = new Schema({
    orderID: { type: String, 
            //    required: true, 
               unique: true },
    userId: { type: Schema.Types.ObjectId,
              ref:"user" },
    productDetails: [
      {
        productID: { type: Schema.Types.ObjectId,
                     ref:"product" },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['preparing order', 'shipped', 'delivered'],
      default: 'preparing order'
    }
  },{timestamps:true});
  
  const Order = mongoose.model('Order', orderSchema);
  
  module.exports = Order;