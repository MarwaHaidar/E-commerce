import Product from "../models/product.js";
import asyncHandler from 'express-async-handler';





// search products (search on input)
export const searchProducts = asyncHandler(async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const regex = new RegExp(searchTerm, 'i');
        const products = await Product.find({ name: regex });
        const productCount = await Product.countDocuments({ name: regex });
        res.status(200).json({ products: products, productCount: productCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//sort and filter products

export const filterSortProducts = asyncHandler(async (req, res) => {
    try {
        const { subcategory, minPrice, maxPrice } = req.query;

        const query = {};

        if (subcategory) {
            // Assuming subcategory is provided as a string with comma-separated values
            const subcategoryIds = subcategory.split(',');

            // Assuming subcategory is the field containing the category IDs in the product schema
            query.subcategory = { $in: subcategoryIds };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        const results = await Product.find(query);
        const resultCount = await Product.countDocuments(query);

        res.status(200).json({ results, resultCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
