const express = require('express');

const OrdersService = require('./../services/ordersService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require('./../schemas/orderSchemas');
const passport =  require('passport');
const router = express.Router();

const service = new OrdersService();

router.get('/', async (req, res, next) =>{
    try{
        const orders = await service.find();
        res.json(orders);    
    }catch(error){
        next(error)
    }
});

router.get('/:id', 
  validatorHandler(getOrderSchema,'params'),    
  async (req, res, next) =>{
    try{
        const { id } = req.params;
        const orders = await service.findOne(id);
        res.json(orders);    
    }catch(error){
        next(error)
    }
});

router.post('/',
    passport.authenticate('jwt', {session:false}),
    // validatorHandler(createOrderSchema, 'body'),
    async (req, res, next) =>{
        try{
            const user = req.user;
            const newOrder = await service.create(user.sub);
            res.status(201).json(newOrder)
        }catch(error){
            next(error);
        }
    }
);

router.post('/add-item',
    validatorHandler(addItemSchema, 'body'),
    async (req, res, next) =>{
        try{
            const data = req.body;
            const newItem = await service.addItem(data);
            res.status(201).json(newItem)
        }catch(error){
            next(error);
        }
    }
);

router.patch('/:id', 
    validatorHandler(getOrderSchema,'params'),
    validatorHandler(updateOrderSchema, 'body'),
    async (req, res, next)=>{
        try{
            const { id } = req.params;
            const data = req.body;
            const order = await service.update(id, data);
            res.status(200).json(order)
        }catch(error){
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getOrderSchema,'params'),
    async (req, res) =>{
    try{
      const { id } = req.params;
      const order = await service.delete(id);
      res.json(order);
    }catch(error){
      next(error);
    }
});

module.exports = router;
  