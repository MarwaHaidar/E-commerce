import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';

// Subdocument schema for variations
const variationSchema = new Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  quantities: [
    {
      size: { type: String, required: true },
      quantity: { type: Number, required: true, min: 0 }
    }
  ]
});

// Subdocument schema for rating and reviews
const reviewSchema = new Schema({
  reviewId: { type: String, required: true },
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

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
  variations: [variationSchema],
  category_id: { type: String, required: true },
  ratingAndReviews: [reviewSchema],
  subcategory: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);
export default Product;;
