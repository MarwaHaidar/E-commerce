import Product from "../models/product.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { uploadMultipleImages } from "./imageuploadcontroller.js";
import { productValidationSchema } from "../validationJoi/productValidation.js";

// create product
const createProduct = asyncHandler(async (req, res) => {
  //------------------ valdiation joi
  const { error } = productValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((detail) => detail.message) });
  }
  //----------------------------------

  const variations = req.body.variations;
var sumQuantitySizes;
var totalQuantity = [];

variations.forEach((variation) => {
  variation.colors.forEach((color) => {
    sumQuantitySizes = color.sizes.reduce(
      (sum, size) => sum + parseInt(size.quantitySizes, 10),
      0
    );
    color.quantity = sumQuantitySizes; // quantity
    totalQuantity.push(sumQuantitySizes);

    // Ensure 'enum' is populated with size values
    color.sizes.forEach((size) => {
      size.enum = [size.size];
    });

    // Log the sizes array for verification
    console.log('Sizes Array:', color.sizes);
  });
});

// Rest of your code...

  const sumQuantity = totalQuantity.reduce((acc, current) => acc + current, 0); // totalQuantity
  console.log(sumQuantity);
  //----------------------------------
  // create product
  const name = req.body.name;
  const desc = req.body.desc;
  const price = req.body.price;
  const discountPercentage = parseInt(req.body.discountPercentage);
  const priceAfterDiscount = parseInt(price - (price * discountPercentage) / 100);
  // const currency = req.body.currency;
  const subcategory = req.body.subcategory;
  const isFeatured = req.body.isFeatured;
  const totalQuantityProducts = sumQuantity;
  const multiimages = req.files ? req.files.map((file) => file.buffer) : [];
  const imagesArray = await uploadMultipleImages(multiimages);
  const imageCover = imagesArray[0];
  const images = imagesArray.slice(1);

  const product = await Product.create({
    name,
    slug: slugify(name),
    desc,
    price,
    variations,
    subcategory,
    images,
    imageCover,
    isFeatured,
    totalQuantityProducts,
    priceAfterDiscount,
  });
  res.status(201).json({ data: product });
});

export { createProduct };

// // create product
// const createProduct = asyncHandler(async (req, res) => {

//   const name = req.body.name;
//   const desc = req.body.desc;
//   const price = req.body.price;
//   const discountPercentage = req.body.discountPercentage;
//   const priceAfterDiscount = price - (price * discountPercentage) / 100;
//   const currency = req.body.currency;
//   const subcategory = req.body.subcategory;
//   const variations = req.body.variations;
//   const isFeatured = req.body.isFeatured;
//   const multiimages = req.files ? req.files.map(file => file.buffer) : [];
//   const imagesArray = await uploadMultipleImages(multiimages);
//   const imageCover = imagesArray[0];
//   const images = imagesArray.slice(1);

//   const product = await Product.create({ name, slug: slugify(name), desc, price, priceAfterDiscount, currency, variations, subcategory, images, imageCover,isFeatured });
//   res.status(201).json({ data: product });

// });
// export { createProduct };

// get all products
// const getproducts = asyncHandler(async (req, res) => {
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 18;
//   const skip = (page - 1) * limit;

//   let filterObject = {};
  
//   if (req.params.id) {
//     // Assuming the ID in the route parameter can be either category or subcategory
//     filterObject = { // get the id of category from params
//       subcategory: req.params.id
//   }
//   }
//   console.log( filterObject)

//   const products = await Product.find(filterObject)
//     .skip(skip)
//     .limit(limit)
//     .populate({ path: "subcategory", select: "name-_id" })
//     .sort({ dateOrdered: -1 });

//   res.status(200).json({ result: products.length, page, data: products });
// });

// export { getproducts };



const getproducts = asyncHandler(async (req, res) => {
  let filterObject = {};
  
  if (req.params.id) {
    // Assuming the ID in the route parameter can be either category or subcategory
    filterObject = { // get the id of category from params
      subcategory: req.params.id
  }
  }
  console.log( filterObject)

  const products = await Product.find(filterObject)
    .populate({ path: "subcategory", select: "name-_id" })
    .sort({ dateOrdered: -1 });

  res.status(200).json({ result: products.length, data: products });
});

export { getproducts };

// get specific product

const getproduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findById(id)
    // .populate({path:'currency',select:'symbol-_id'})
    .populate({ path: "subcategory", select: "name-_id" });
  if (!product) {
    res.status(404).json({ msg: `no product for this id ${id}` });
  }
  res.status(200).json({ data: product });
});
export { getproduct };

// update specific product


// get the quantity sizes of a specific item

const getProductSizeQuantity = asyncHandler(async (req, res) => {
  const { id, color, size } = req.body; // Extract item ID, color, and size from request parameters

  try {
    // Find the product with the matching _id
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let sizeQuantity; // Remove initialization

    // Get the first variation from the variations array
    const firstVariation = product.variations[0];

    // Find the variation with the specific color
    const variationWithColor = firstVariation.colors.find(c => c.color === color);

    if (variationWithColor) {
      // Find the size
      const sizeObject = variationWithColor.sizes.find(s => s.enum[0] === size); // Assuming 'enum' contains the size value
      
      // Check if sizeObject was found
      if (sizeObject) {
        sizeQuantity = sizeObject.quantitySizes;
      } else {
        // Size not found, return appropriate response
        return res.status(403).json({ message: "Size not found" });
      }
    } else {
      // Color not found, return appropriate response
      return res.status(409).json({ message: "Color not found" });
    }

    // If size quantity is not found, you can return a response indicating that
    if (sizeQuantity === undefined) {
      return res.status(405).json({ message: "Size quantity not found" });
    }

    console.log(sizeQuantity); // Move the console.log here
    return res.json({ id, color, size, quantity: sizeQuantity });
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { getProductSizeQuantity };






////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

const updateproduct = asyncHandler(async (req, res) => {
  //----------------------------------
  const variations = req.body.variations;
  var sumQuantitySizes;
  var totalQuantity = [];
  
  variations.forEach((variation) => {
    variation.colors.forEach((color) => {
      sumQuantitySizes = color.sizes.reduce(
        (sum, size) => sum + parseInt(size.quantitySizes, 10),
        0
      );
      color.quantity = sumQuantitySizes; // quantity
      totalQuantity.push(sumQuantitySizes);
  
      // Ensure 'enum' is populated with size values
      color.sizes.forEach((size) => {
        size.enum = [size.size];
      });
  
      // Log the sizes array for verification
      console.log('Sizes Array:', color.sizes);
    });
  });
  
  // Rest of your code...
  
    const sumQuantity = totalQuantity.reduce((acc, current) => acc + current, 0); // totalQuantity
    console.log(sumQuantity);
  //----------------------------------

  // calculateDiscountedPrice(req, res, () => {});

  const { id } = req.params;
  const { name } = req.body;
  const { desc } = req.body;
  const { price } = req.body;
  const discountPercentage = parseInt(req.body.discountPercentage);
  const priceAfterDiscount = parseInt(price - (price * discountPercentage) / 100);
  // const { currency } = req.body;
  const { subcategory } = req.body;
  const { isFeatured } = req.body;
  const totalQuantityProducts = sumQuantity;
  const multiimages = req.files ? req.files.map((file) => file.buffer) : [];
  const imagesArray = await uploadMultipleImages(multiimages);
  const imageCover = imagesArray[0];
  const images = imagesArray.slice(1);

  // Check if 'name' is provided in the request body before generating the slug
  const slug = name ? slugify(name, { lower: true }) : undefined;

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
    name,
    slug: slugify(name),
    desc,
    price,
    variations,
    subcategory,
    images,
    imageCover,
    isFeatured,
    totalQuantityProducts,
    priceAfterDiscount,
    },
    { new: true }
  );

  if (!product) {
    res.status(404).json({ msg: `no product for this is ${id}` });
  }
  res.status(200).json({ data: product });
});
export { updateproduct };




const updateproductImage = asyncHandler(async (req, res) => {
  //----------------------------------
  // const variations = req.body.variations;

  // var sumQuantitySizes;
  // var totalQuantity = [];
  // variations.forEach((variation) => {
  //   variation.colors.forEach((color) => {
  //     sumQuantitySizes = color.sizes.reduce(
  //       (sum, size) => sum + size.quantitySizes,
  //       0
  //     );
  //     color.quantity = sumQuantitySizes; // quantity
  //   });
  //   totalQuantity.push(sumQuantitySizes);
  // });
  // const sumQuantity = totalQuantity.reduce((acc, current) => acc + current, 0); // totalQuantity
  // console.log(sumQuantity);
  //----------------------------------

  // calculateDiscountedPrice(req, res, () => {});

  const { id } = req.params;
  const { name } = req.body;
  const { desc } = req.body;
  const { price } = req.body;
  const { discountPercentage } = req.body;
  const { priceAfterDiscount } = price - (price * discountPercentage) / 100;
  const { currency } = req.body;
  const { subcategory } = req.body;
  const { isFeatured } = req.body;
  const multiimages = req.files ? req.files.map((file) => file.buffer) : [];
  const imagesArray = await uploadMultipleImages(multiimages);
  const imageCover = imagesArray[0];
  const images = imagesArray.slice(1);

  // Check if 'name' is provided in the request body before generating the slug
  const slug = name ? slugify(name, { lower: true }) : undefined;

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      name,
      slug,
      desc,
      price,
      priceAfterDiscount,
      // currency,
      // variations,
      subcategory,
      imageCover,
      images,
      isFeatured,
    },
    { new: true }
  );

  if (!product) {
    res.status(404).json({ msg: `no product for this is ${id}` });
  }
  res.status(200).json({ data: product });
});
export { updateproductImage };













// delete specific product

const deleteproduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    res.status(404).json({ msg: `NO Product FOR THIS ID ${id}` });
  }
  res.status(200).json({ msg: `the Product  was deleted successfully` });
});
export { deleteproduct };

// Featured Products

const FeaturedProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const product = await Product.find({ isFeatured: true }) // get only the true Featured Product
    .skip(skip)
    .limit(limit);

  if (!product) {
    res.status(404).json({ msg: `no Feature product ` });
  }
  res.status(200).json({ data: product });
});
export { FeaturedProducts };
