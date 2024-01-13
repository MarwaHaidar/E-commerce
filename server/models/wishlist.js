import mongoose from "mongoose";
import {Schema,model} from mongoose;

const wishlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, 
              ref: 'User', 
              required: true },
    wishlist: [
      {
        productId: { type: Schema.Types.ObjectId, 
                     ref: 'Product', 
                     required: true },
        productName: { type: String, required: true },
      }
    ],
  });
  
  const Wishlist = mongoose.model('Wishlist', wishlistSchema);
  
  export default Wishlist;