import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  orderItems: [
    {
      product: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1, default: 1 }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  totalStatus: {
    type: Number,
    required: true,
    min: 0 
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  }
});

const Order = model('Order', orderSchema);

export default Order;
