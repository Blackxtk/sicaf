const express = require('express');

const UsersService = require('./../services/usersService');
const validatorHandler = require('./../middlewares/validatorHandler');
const {createUsersSchema, updateUsersSchema, getUsersSchema} = require('./../schemas/usersSchemas');

const router = express.Router();

const service = new UsersService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
  res.json(users);
  } catch (error) {
    next(error);
  }
  
  });

router.get('/:id',
  validatorHandler(getUsersSchema, 'params'),
  async (req, res, next) => {
    try{
  const { id } = req.params;
  const user = await service.findOne(id);
  res.json(user);
    }catch(error){
    next(error);
  }
})

router.post('/',
  validatorHandler(createUsersSchema, 'body'),
  async (req, res, next) => {
    try{
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    }catch(error){
      next(error);
    }
});

router.patch('/:id',
  validatorHandler(getUsersSchema, 'params'),
  validatorHandler(updateUsersSchema, 'body'),
  async (req, res) =>{
  try{
  const { id } = req.params;
  const body = req.body;
  const user = await service.update(id, body);
  res.json(user);
  }catch(error){
    res.status(404).json({
      message: error.message
    })
  }
});

router.delete('/:id',
  validatorHandler(getUsersSchema, 'params'),
  async (req, res) =>{
    try{
    const { id } = req.params;
    const user = await service.delete(id);
    res.json(user);
  }catch(error){
    res.status(404).json({
    message: error.message
  })
}
});

module.exports = router;
