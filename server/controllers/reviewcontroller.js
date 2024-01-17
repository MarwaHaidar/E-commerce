import Review from '../models/review.js';
// import slugify from 'slugify';
import asyncHandler from 'express-async-handler';




// create review

const createReview = asyncHandler(async(req,res)=>{
    const userId = req.body.userId;
    const productId = req.body.productId;
    const rating = req.body.rating;
    const reviewText = req.body.reviewText;
    // const reviewImage = req.body.reviewImage;
    const review = await Review.create({userId,productId,rating,reviewText});
    res.status(201).json({data:review});

    });
    export { createReview };


    // get all reviews
const getreviews = asyncHandler(async(req,res)=>{
const page=req.query.page*1 || 1;// req.query: take data from url not from req body, *1 to change it from string to number
const limit=req.query.limit*1 || 5; // in selected page give 5 categories
const skip=(page-1)*limit

const reviews= await Review.find({}).skip(skip).limit(limit);
res.status(200).json({result:reviews.length,page,data:reviews});

});
export { getreviews };




// get specific review

const getreview = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const review = await Review.findById(id);
    if(!review){
     res.status(404).json({msg:`no review for this id ${id}`})
    }
    res.status(200).json({data:review})
    });
    export { getreview  };


    
// update specific review 

const updatereview = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const {userId}=req.body;
    const {productId}=req.body;
    const {rating}= req.body;
    const {reviewText}= req.body;
    // const {reviewImage} = req.body.reviewImage;
    

      const review = await Review.findOneAndUpdate(
        { _id: id },
        { userId,productId,rating,reviewText },
        { new: true }
      );
    
        if(!review){
            res.status(404).json({msg:`no review for this is ${id}`})
        }
        res.status(200).json({data:review})
    })
    export { updatereview };
    
    
// delete specific product 

const deletereview = asyncHandler(async(req,res) =>{

    const {id} = req.params;
    const review = await Review.findOneAndDelete({_id:id});
    if(!review){
        res.status(404).json({msg:`NO review FOR THIS ID ${id}`});

    }
    res.status(200).json({msg: `the review  was deleted successfully`})
}) 
export {deletereview}
