import { cartModel } from "./models/cartsModel.js"

export class CartsDAO{
    async getAll(filtro={}){
        return await cartModel.find(filtro).lean()
    }

    async getOneBy(filtro={}){
        return await cartModel.findOne(filtro).lean()
    }

    async create(){
        let newCart=await cartModel.create({products:[]})
        return newCart.toJSON()
    }

    async update(id, updatedCart){
        return await cartModel.findByIdAndUpdate(id, updatedCart, {returnDocument: 'after'})
    }
}