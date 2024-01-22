// validationJoi/productValidation.js
import Joi from 'joi';

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().lowercase(),
  desc: Joi.string().required(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number(),
  imageCover: Joi.string(),
  images: Joi.array().items(Joi.string()),
  currency: Joi.string().required(),
  variations:Joi.required(),
  subcategory: Joi.string().required(),
  isFeatured: Joi.boolean().default(false),
  totalQuantityProducts: Joi.number(),
});

export { productValidationSchema };
