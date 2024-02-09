import { Schema, model } from "mongoose";

// Subdocument schema for variations
const variationSchema = new Schema({
  colors: [
    {
      color: { type: String, required: true },
      sizes: [
        {
          enum: ["small", "medium", "large"],
          quantitySizes: { type: Number, required: true, min: 0 },
        },
      ],
      quantity: { type: Number, required: true, min: 0 },
    },
  ],
});

// {
//   "colors": [
//     {
//       "color": "Red",
//       "quantity": 10,
//       "sizes": [
//         { "size": "small", "quantitySizes": 3 },
//         { "size": "medium", "quantitySizes": 5 },
//         { "size": "large", "quantitySizes": 2 }
//       ]
//     },
//     {
//       "color": "Blue",
//       "quantity": 15,
//       "sizes": [
//         { "size": "small", "quantitySizes": 6 },
//         { "size": "medium", "quantitySizes": 7 },
//         { "size": "large", "quantitySizes": 2 }
//       ]
//     }
//   ]
// }

// Main product schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },

    slug: {
      type: String,
      lowecase: true,
    },

    desc: {
      type: String,
      required: true,
    },

    price: { type: Number, required: true, min: 0 },

    priceAfterDiscount: {
      type: Number,
    },
    imageCover: {
      type: String,
    },
    images: [String],
    currency: {
      type: Schema.Types.ObjectId,
      ref: "Currency",
    },
    variations: [variationSchema],
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    isFeatured: {
      type: Boolean, // to get the product who need to review in home page
      default: false,
    },
    totalQuantityProducts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);



const Product = model("Product", productSchema);
export default Product;
