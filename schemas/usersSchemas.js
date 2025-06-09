const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const numeroCedula = Joi.number().integer().min(1).max(9999999999);
const tipoDocumento = Joi.number().integer().min(1).max(99);
const email = Joi.string().min(1).max(255);
const password = Joi.string().min(1).max(255);
const role = Joi.string().min(1).max(50);
const token=Joi.string(); 

const createUsersSchema = Joi.object ({
  name: name.required(),
  numeroCedula: numeroCedula.required(),
  tipoDocumento: tipoDocumento.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUsersSchema = Joi.object ({
  name: name,
  numeroCedula: numeroCedula,
  tipoDocumento: tipoDocumento,
  email: email,
  password: password,
  role: role
});

const getUsersSchema = Joi.object ({
  id: id.required(),
});

const changePassSchema = Joi.object ({
  password: password.required(),
  token: token
});

module.exports = { createUsersSchema, updateUsersSchema, getUsersSchema, changePassSchema}
