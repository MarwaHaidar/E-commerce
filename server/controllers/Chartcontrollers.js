import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';
import Category from '../models/category.js';
import Subcategory from '../models/subcategory.js';
import User from '../models/user.js';
import Order from '../models/order.js';
import Delivery from '../models/delivery.js';


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

const getUserCountByYear =asyncHandler( async (req, res) => {
    try {
      const userCountByYear = await User.aggregate([
        {
          $group: {
            _id: { $year: "$createdAt" },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } } // Optionally, sort by year
      ]);
  
      res.json(userCountByYear);
    } catch (error) {
      console.error('Error fetching user count by year:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  export {getUserCountByYear};


  const getOrdersByYear = asyncHandler(async (req,res) => {
    try {
      const ordersByYear = await Order.aggregate([
        {
          $group: {
            _id: { $year: "$dateOrdered" }, // Extract year from dateOrdered
            count: { $sum: 1 } // Count the number of orders for each year
          }
        },
        
            { $sort: { _id: 1 } } // Optionally, sort by year
        ]);
    
        res.json(ordersByYear);
      } catch (error) {
        console.error('Error fetching order count by year:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  export {getOrdersByYear};

  const getUsersbyCountry = asyncHandler(async (req,res) => {
    try {
      const usersbycountry = await Delivery.aggregate([
        {
            $group: {
                _id: "$shipping.address.country", // Group by the country field
                userCount: { $sum: 1 } // Count the number of users in each country
              }
        },
        
            { $sort: { _id: 1 } } // Optionally, sort by year
        ]);
    
        res.json(usersbycountry);
      } catch (error) {
        console.error('Error fetching users count by country:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  export {getUsersbyCountry};