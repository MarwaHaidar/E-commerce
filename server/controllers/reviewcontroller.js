import Review from '../models/review.js';
// import slugify from 'slugify';
import asyncHandler from 'express-async-handler';




// create review

const createReview = asyncHandler(async(req,res)=>{
    const UserId = req.body.UserId;
    const productId = req.body.productId;
    const rating = req.body.rating;
    const reviewText = req.body.reviewText;
    // const reviewImage = req.body.reviewImage;
    
    const review = await Review.create({UserId,productId,rating,reviewText});
    res.status(201).json({data:review});
    
    });
    export { createReview };