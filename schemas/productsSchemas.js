const Joi = require('joi');

const id = Joi.number().integer();
const nombreProducto = Joi.string().min(3).max(20);
const description = Joi.string().min(3).max(255);
const price = Joi.number().precision(2);
const idCategory = Joi.number().integer().min(1)
const image = Joi.string();
const limit = Joi.string();
const offset = Joi.string();
const priceMin = Joi.number().precision(2);
const priceMax = Joi.number().precision(2);



const createProductSchema = Joi.object({
  nombreProducto: nombreProducto.required(),
  price: price.required(),
  idCategory: idCategory.required(),
  description: description.required(),
  image: image.required(),
});

const updateProductSchema = Joi.object({
  idCategory: idCategory,
  nombreProducto: nombreProducto,
  price: price,
  description: description,
  image: image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  priceMin: priceMin,
  priceMax: priceMax.when('priceMin', {
    is: Joi.number().precision(2),
    then: Joi.required()
  })

});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
