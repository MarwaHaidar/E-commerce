import { Schema, model } from 'mongoose';



const reviewSchema = new Schema({

  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  reviews: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      fullName: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      reviewText: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }]
});



const Review = model('Review', reviewSchema);

export default Review;
