import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
const subcategoryModel=require('./subcategory').schema;

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
  product_id: { type: Number, 
                unique: true },
  name: { type: String, 
          required: true },
  desc: { type: String, 
          required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: Schema.Types.ObjectId, 
              ref: 'Currency', 
              required: true }, // Reference to Currency collection
  variations: [variationSchema],
//   category_id: { type: String, required: true },
//   ratingAndReviews: [reviewSchema],
  subcategory: subcategoryModel,
},{timestamps:true});


// Initialize the auto-increment plugin
autoIncrement.initialize(mongoose.connection);

// Apply the auto-increment plugin to your schema
productSchema.plugin(autoIncrement.plugin, { model: 'Product', field: 'product_id', startAt: 1 });


const Product = mongoose.model('Product', productSchema);
export default Product;
