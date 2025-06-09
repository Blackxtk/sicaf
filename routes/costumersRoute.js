const express = require('express');

const CostumersService = require('./../services/costumersService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { createCostumersSchema, updateCostumersSchema, getCostumersSchema } = require('./../schemas/costumersSchemas');

const router = express.Router();

const service = new CostumersService();

router.get('/', async (req, res, next)=>{
    try{
        const costumers = await service.find();
        res.json(costumers);
    }catch (error){
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getCostumersSchema, 'params'),
    async (req, res, next) =>{
        try{
            const { id } = req.params;
            const costumers =  await service.findOne(id);
            res.json(costumers);
        }catch(error){
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createCostumersSchema, 'body'),
        async (req, res, next) =>{
        try{
            const data = req.body;
            const newCostumer = await service.create(data);
            res.status(201).json(newCostumer);
        }catch(error){
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getCostumersSchema, 'params'),
    validatorHandler(updateCostumersSchema, 'body'),
    async(req,res)=>{
        try{
            const { id } = req.params;
            const changes = req.body;
            const rta = await service.update(id, changes);
            res.json(rta);
        }catch(error){
            res.status(404).json({
                message: error.message
            })
        }
    }
);

router.delete('/:id', async(req,res)=>{
        try{
            const { id } = req.params;
            const rta = await service.update(id);
            res.json(rta);
        }catch(error){
            res.status(404).json({
                message: error.message
            })
        }
    }
);

module.exports = router;