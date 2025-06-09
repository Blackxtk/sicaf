const Joi = require('joi');

const id = Joi.number().integer();
const nomCategory = Joi.string().min(3).max(20);
const desCategory = Joi.string().max(255);
const image = Joi.string().min(15).max(255);


const createCategoriesSchema = Joi.object({
  nomCategory: nomCategory.required(),
  image: image.required(),
  desCategory: desCategory.required()
});

const updateCategoriesSchema = Joi.object({
  nomCategory: nomCategory,
  image: image,
  desCategory: desCategory
});

const getCategoriesSchema =  Joi.object({
  id: id.required(),
});

module.exports = { createCategoriesSchema, updateCategoriesSchema, getCategoriesSchema }
