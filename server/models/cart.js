
import { Schema, model } from 'mongoose';



const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      currency: {
        type: String,
        required: true
      }, // Add currency information
      size:{
        type:String,
        required:true
      },
      color:{
        type:String,
        required:true
      }
    }
  ],
});

const Cart = model('Cart', cartSchema);

export default Cart;