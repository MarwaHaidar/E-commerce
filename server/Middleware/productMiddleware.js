import Product from "../models/product.js";

export const calculateDiscountedPrice = (req, res, next) => {
  try {
    const { price } = req.body;
    // Calculate priceAfterDiscount  10% discount
    const discountPercentage = 10;
    const priceAfterDiscount = price - (price * discountPercentage) / 100;

    req.body.priceAfterDiscount = priceAfterDiscount;

    next();

  } catch (error) {
    console.error('Error calculating discounted price:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


