import {Schema,model} from 'mongoose';


const orderItemsSchema = new Schema({
    product: { type: Schema.Types.ObjectId,
         ref: 'Product' },

    quantity: { type: Number, 
    required: true, 
    min: 1 ,
    default:1,
    },

})

const OrderItem = model('OrderItem', orderItemsSchema);
  
export default OrderItem;

