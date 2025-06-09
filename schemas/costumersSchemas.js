const Joi = require ('joi');

const id = Joi.number().integer();
const costumerName = Joi.string().min(3).max(50);
const lastName = Joi.string().min(3).max(50);
const phone = Joi.string();
const userId = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const numeroCedula = Joi.number().integer().min(1).max(9999999999);
const tipoDocumento = Joi.number().integer().min(1).max(99);
const email = Joi.string().min(1).max(255);
const password = Joi.string().min(1).max(255);
const role = Joi.string().min(1).max(50);

const createCostumersSchema = Joi.object({
    costumerName: costumerName.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    user: Joi.object({
        name: name.required(),
        numeroCedula: numeroCedula.required(),
        tipoDocumento: tipoDocumento.required(),
        email: email.required(),
        password: password.required(),
        role: role.required()
    })
});

const updateCostumersSchema = Joi.object({
    costumerName: costumerName,
    lastName: lastName,
    phone: phone,
    userId: userId,
});

const getCostumersSchema = Joi.object({
    id: id.required(),
});

module.exports = { createCostumersSchema, updateCostumersSchema, getCostumersSchema }
