import { Schema, model } from 'mongoose';


// Subdocument schema for variations
const variationSchema = new Schema({
  color: { type: String, required: true },
  sizes: [
    {
      size: { type: String, required: true },
      quantity: { type: Number, required: true, min: 0 },
      
    },
  ],
});



// Main product schema
const productSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  slug: {
    type: String,
    lowecase: true,
  },

  desc: {
    type: String,
    required: true
  },

  price: { type: Number,
    required: true,
     min: 0 },

  priceAfterDiscount: {
    type: Number
  },
  imageCover: {
    type: String,

  }
  ,
  images: [String]
  ,

  currency: {
    type: Schema.Types.ObjectId,
    ref: 'Currency',
    required: true
  }
 ,
  variations: [variationSchema]
  ,

  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true
  }
  ,
  isFeatured: {
    type: Boolean, // to get the product who need to review in home page 
    default: false
  }
  
}, { timestamps: true });



const Product = model('Product', productSchema);
export default Product;
