import {Schema,model} from 'mongoose';


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
  
  name: { type: String, 
          required: true },
          
  slug:{
        type:String,
        lowecase:true,
  },

  desc: { type: String, 
          required: true },
  // image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: Schema.Types.ObjectId, 
              ref: 'Currency', 
              required: true }, // Reference to Currency collection
  variations: [variationSchema],
//   category_id: { type: String, required: true },
//   ratingAndReviews: [reviewSchema],
   subcategory: { type: Schema.Types.ObjectId,
     ref: 'Subcategory',
      required: true }

},{timestamps:true});





const Product =model('Product', productSchema);
export default Product;
