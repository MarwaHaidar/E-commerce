import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';
import Category from '../models/category.js';
import Subcategory from '../models/subcategory.js';
import User from '../models/user.js';

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

const getCategoriesCount = asyncHandler(async(req,res)=>{
    try{
        const categoriescount =await Category.countDocuments();
        res.json({count : categoriescount});

    }catch(error){
        console.log('Error fetching category count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
export {getCategoriesCount};

const getsubcategoryCount = asyncHandler(async(req,res)=>{
    try{
        const subcategoryCount =await Subcategory.countDocuments();
        res.json({count : subcategoryCount});

    }catch(error){
        console.log('Error fetching subcategory count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
export {getsubcategoryCount};

const getUserCount = asyncHandler(async(req,res)=>{
    try{
        const userCount =await User.countDocuments();
        res.json({count : userCount});

    }catch(error){
        console.log('Error fetching users count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
export {getUserCount};

