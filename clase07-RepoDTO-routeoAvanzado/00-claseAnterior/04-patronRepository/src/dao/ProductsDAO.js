import { productsModel } from "./models/productsModel.js";


export class ProductsDAO{

    async getAll(filtro={}){
        return await productsModel.find(filtro).lean()
    }

    async getOneBy(filtro={}){
        return await productsModel.findOne(filtro).lean()
    }

    async create(product){
        let newProduct=await productsModel.create(product)
        return newProduct.toJSON()   // create no tiene .lean()
    }

    // update y el delete
    
}