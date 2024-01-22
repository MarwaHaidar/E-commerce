import Joi from 'joi';

const orderValidationSchema = Joi.object({
    userId: Joi.string().required(),
    orderItems: Joi.array().items(
      Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    ).required(),
    status: Joi.string().valid('paid', 'unpaid').required(),
  });
  
  export { orderValidationSchema };