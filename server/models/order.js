
import {Schema,model} from 'mongoose';
import mongoose from 'mongoose';


const orderSchema = new Schema({
  userId: {
     type: Schema.Types.ObjectId,
      ref: 'User'
     },

  orderItems:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'OrderItem',
    required:true
  }], 
    // productDetails: [
    //   {
    //     product: { type: Schema.Types.ObjectId, ref: 'Product' },
    //     quantity: { type: Number, 
    //                 required: true, 
    //                 min: 1 ,
    //                 default:1,
    //               },
    //   },
    // ],

    // subTotal: { type: Number, 
    //   required: true,
    //    min: 0 },

    totalAmount: { type: Number, 
      required: true,
       min: 0 },

     TotalStatus:{
      type: Number,
      required: true,
       min: 0 
    }
      ,
    status: {
      type: String,
      enum: ['paid', 'unpaid'],
      
    },
    dateOrdered:{
      type:Date,
      default:Date.now,
    }
  })
  
  const Order = model('Order', orderSchema);
  
  export default Order;