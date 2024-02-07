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
    });
  });
  const sumQuantity = totalQuantity.reduce((acc, current) => acc + current, 0); // totalQuantity
  console.log(sumQuantity);
  //----------------------------------
  // create product
  const name = req.body.name;
  const desc = req.body.desc;
  const price = req.body.price;
  // const discountPercentage = req.body.discountPercentage;
  // const priceAfterDiscount = price - (price * discountPercentage) / 100;
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
    // priceAfterDiscount,
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
const getproducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1; // req.query: take data from url not from req body, *1 to change it from string to number
  const limit = req.query.limit * 1 || 5; // in selected page give 5 categories
  const skip = (page - 1) * limit;
  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    // .populate({path:'currency',select:'symbol-_id'})
    .populate({ path: "subcategory", select: "name-_id" })
    .sort({ dateOrdered: -1 });

  res.status(200).json({ result: products.length, page, data: products });
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

const updateproduct = asyncHandler(async (req, res) => {
  //----------------------------------
  const variations = req.body.variations;

  var sumQuantitySizes;
  var totalQuantity = [];
  variations.forEach((variation) => {
    variation.colors.forEach((color) => {
      sumQuantitySizes = color.sizes.reduce(
        (sum, size) => sum + size.quantitySizes,
        0
      );
      color.quantity = sumQuantitySizes; // quantity
    });
    totalQuantity.push(sumQuantitySizes);
  });
  const sumQuantity = totalQuantity.reduce((acc, current) => acc + current, 0); // totalQuantity
  console.log(sumQuantity);
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
      currency,
      variations,
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
export { updateproduct };

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
