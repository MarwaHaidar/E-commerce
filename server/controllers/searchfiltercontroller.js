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
        const { categories, subcategories, minPrice, maxPrice, sortBy } = req.query;

        const query = {};

        if (categories && Array.isArray(categories)) {
            query.category = { $in: categories.slug };
        }

        if (subcategories && Array.isArray(subcategories)) {
            query.subcategories = { $in: subcategories.slug };
            const products = await Product.find(query).populate({
                path: 'subcategories', populate: { path: 'category' }
            });

            res.status(200).json(products);
            return;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        let results = await Product.find(query);
        let resultCount = await Product.countDocuments(query);
        if (sortBy) {
            switch (sortBy) {
                case 'price-asc':
                    results = results.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    results = results.sort((a, b) => b.price - a.price);
                    break;
                default:
                    results = await Product.find()
                    break;
            }
        }

        res.status(200).json({ results, resultCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});