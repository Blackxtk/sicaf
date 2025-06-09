const express = require('express');

const CategoriesService = require('./../services/categoriesService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { checkAdminRole, checkRoles } = require('./../middlewares/authHandler');

const {createCategoriesSchema, updateCategoriesSchema, getCategoriesSchema} = require('./../schemas/categoriesSchemas');
const passport = require('passport');


const router = express.Router();

const service = new CategoriesService();

router.get('/', 
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'costumer'),
  async (req, res, next) => {
  try{
  const categories = await service.find();
  res.json(categories);
  } catch (error) {
    next(error);
  }
  });

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'costumer'),
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
  try{
  const { id } = req.params;
  const categories = await service.findOne(id);
  res.json(categories);
  }catch (error){
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createCategoriesSchema, 'body'),
  async (req, res, next) =>{
  try{
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
}catch (error){
  next(error);
}
});

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCategoriesSchema, 'params'),
  validatorHandler(updateCategoriesSchema, 'body'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

});

router.delete('/:id', 
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
  try {
    const { id } = req.params;
    const category = await service.delete(id);
    res.json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message
  })
}
});

module.exports = router;
