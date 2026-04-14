import { usersModel } from "./models/usersModel.js";


export class UsersDAO{

    // CRUD, con 2 Reads

    async getAll(filtro={}){
        return await usersModel.find(filtro).lean()  // lean transforma salida en objetos plain de JS (deshidrata los documentos de mongoose)
    }

    async getOneBy(filtro={}){
        return await usersModel.findOne(filtro).lean()  // lean transforma salida en objetos plain de JS (deshidrata los documentos de mongoose)
    }

    async create(user){
        let nuevoUsuario=await usersModel.create(user)
        return nuevoUsuario.toJSON()
    }

    // update y delete
}