const express = require('express');

const productsRouter = require('./productsRoute');
const categoriesRouter = require('./categoriesRoute');
const usersRouter = require('./usersRoute');
const costumersRouter = require('./costumersRoute');
const orderRouter = require('./ordersRoute');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');






function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/costumers', costumersRouter);
  router.use('/orders', orderRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
