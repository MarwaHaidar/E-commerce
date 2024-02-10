import Review from '../models/review.js';
import User from '../models/user.js'
import Product from '../models/product.js'
import asyncHandler from 'express-async-handler';




// create review

const createReview = asyncHandler(async (req, res) => {
    const productId = req.body.productId;
    const userId = req.body.userId;
    const user = await User.findById(userId).exec();
    const fullName = user.first_name + " " + user.last_name;
    const rating = req.body.rating;
    const reviewText = req.body.reviewText;
    const reviews = [{
        userId,
        fullName,
        rating,
        reviewText
    }]
    let review = await Review.findOne({ productId });
    try {
        if (!review) {
            review = await Review.create({ productId, reviews });
            res.status(201).json({ review: review });
            console.log("Reviewed :", review)
        }
        else {
            review.reviews.push(...reviews);
            await review.save();
            res.json({ "new review added": review });
        }
    } catch (error) {
        console.error(error)
    }

});
export { createReview };


// get all reviews
const getreviews = asyncHandler(async (req, res) => {

    try {
        const reviews = await Review.find({}).populate({
            path: 'productId',
            model: 'Product',
            select: 'name imageCover'
        }).populate({
            path: 'reviews.userId',
            model: 'User',
            select: 'fullName'
        });

        res.status(200).json({ result: reviews.length, data: reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});
export { getreviews };




// get product review

const getProductreview = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    console.log(productId)
    const reviews = await Review.find({ productId: productId })
    console.log(reviews)
    if (!reviews) {
        res.status(404).json({ msg: `no review for this id ${productId}` })
    }
    res.status(200).json({ data: reviews })
});
export { getProductreview };



// update specific review 

const updatereview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const { productId } = req.body;
    const { rating } = req.body;
    const { reviewText } = req.body;
    // const {reviewImage} = req.body.reviewImage;


    const review = await Review.findOneAndUpdate(
        { _id: id },
        { userId, productId, rating, reviewText },
        { new: true }
    );

    if (!review) {
        res.status(404).json({ msg: `no review for this is ${id}` })
    }
    res.status(200).json({ data: review })
})
export { updatereview };


// delete specific product 

const deletereview = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const review = await Review.findOneAndDelete({ _id: id });
    if (!review) {
        res.status(404).json({ msg: `NO review FOR THIS ID ${id}` });

    }
    res.status(200).json({ msg: `the review  was deleted successfully` })
})
export { deletereview }
