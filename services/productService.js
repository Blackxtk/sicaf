const boom = require('@hapi/boom');

const { models } = require ('./../libs/sequelize');
const { Op } = require('sequelize');



class ProductsService{

    async create(data){
      const newProduct = await models.Product.create(data);
      return newProduct;
    }

    async find(query){
      const options = {
        include: ['category'],
        where: {}
      }
      const { limit, offset } = query;
      if (limit && offset){
        options.limit = limit;
        options.offset = offset;    
      }
      const { price } = query;
      if ( price ){
        options.where.price = price;
      }
      const { priceMin, priceMax } = query;
      if ( priceMin && priceMax ){
        options.where.price = {
          [Op.between]: [priceMin,priceMax]
          // [Op.gte]: priceMin,
          // [Op.lte]: priceMax
        }
      }
      const rta = await models.Product.findAll(options);
      return rta;
    }

    async findOne(id){
    const product = await models.Product.findByPk(id,{
      include: ['category']
    });
      if(!product){
        throw boom.notFound('product not found');
      }else{
        return product;
      }
    }

    async update(id, changes){
      const product = await this.findOne(id);
      const rta = await product.update(changes);
      return rta;
    }

    async delete(id){
    const product = await this.findOne(id);
    await product.destroy(id);
    return { id };
    }
}

module.exports = ProductsService
