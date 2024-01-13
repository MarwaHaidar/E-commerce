import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';

const userModel = require("./user").schema;
const productModel = require("./product").schema;


const orderSchema = new Schema({
    order_id: { type: String, 
            //    required: true, 
               unique: true },
    user_id: userModel,
    productDetails: [
      {
        product: [productModel],
        quantity: { type: Number, 
                    required: true, 
                    min: 1 ,
                    default:1,}
      }
    ],
    
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['shipped', 'delivered'],
      
    }
  },{timestamps:true});
  
  const Order = mongoose.model('Order', orderSchema);
  
  module.exports = Order;