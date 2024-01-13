import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const userModel = require("./user").schema;
const productModel = require("./product").schema;

const reviewSchema = new Schema({
  reviewId: { type: Number, 
              required: true },
  userId: userModel,//emabed document to create relation btw review and user
  productId: productModel,//embed document to create relation btw review and product
  rating: { type: Number, 
            required: true, 
            min: 1, 
            max: 5 },
  reviewText: { type: String, 
                required: true },
  reviewImage:{type:String},              
  date: { type: Date, 
          default: Date.now }
});

// Initialize the auto-increment plugin
autoIncrement.initialize(mongoose.connection);

// Apply the auto-increment plugin to your schema
reviewSchema.plugin(autoIncrement.plugin, { model: 'Review', field: 'reviewId', startAt: 1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
