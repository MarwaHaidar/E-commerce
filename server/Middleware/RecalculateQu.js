import Product from "../models/product.js";
import asyncHandler from 'express-async-handler';


const calculateQuantity = asyncHandler(async (req, res, next) => {
    try {
      const orderItems = req.body.orderItems;
      for (const orderItem of orderItems) {
        const { product, color, size, quantity } = orderItem;
        // console.log(orderItem)
        // Find the product by ID
        const products = await Product.findById(product);
        // console.log(products)
        // Find the specific color and size within the product
        const colorToUpdate = products.variations[0].colors.find(c => c.color === color);
        // console.log(colorToUpdate.sizes)
        const sizeToUpdate = colorToUpdate.sizes.find(s => s.enum[0] === size);
        console.log(sizeToUpdate )
        // Update the quantity
        sizeToUpdate.quantitySizes -= quantity;
        colorToUpdate.quantity -= quantity;
        // Save the updated product to the database
        await products.save();
      }
      res.status(200).json({ message: 'Order placed successfully.' });
    } catch (error) {
      console.error('Error updating quantities:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  export { calculateQuantity };