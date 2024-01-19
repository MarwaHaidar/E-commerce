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

//   const newProduct = new Product({
//     name: "Example Product",
//     // ... other fields ...
//     variations: [
//       {
//         color: "Red",
//         sizes: [
//           {
//             size: "Small",
//             quantity: 10,
//           },

//         ],
//       },
//       // Add more variations if needed
//     ],
//     // ... other fields ...
//   });



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
  sold: {
    type: Number,
    default: 0,
  },

  price: { type: Number, required: true, min: 0 },

  priceAfterDiscount: {
    type: Number
  },
  imageCover: {
    type: String,
    required: [true, 'Product Image Cover is required']
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

  ratingAverage: {
    type: Number,
    min: [1, 'Rating must be above or equal 1'],
    max: [1, 'Rating must be below or equal 5'],
  }

}, { timestamps: true });



const Product = model('Product', productSchema);
export default Product;
