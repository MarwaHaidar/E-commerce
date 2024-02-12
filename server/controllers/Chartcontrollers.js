import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';


const getProductCount = asyncHandler(async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.json({ count: productCount });
    } catch (error) {
        console.error('Error fetching product count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export {getProductCount}




