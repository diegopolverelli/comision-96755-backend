import mongoose from "mongoose"

export class Singleton{
    static #conexion=null

    constructor(url, dbName){
        mongoose.connect(url, {dbName})
    }

    static conectarDB(url, dbName){
        if(this.#conexion){
            console.log(`Ya exite una conexión establecida...!!!`)
            return this.#conexion
        }

        this.#conexion=new Singleton(url, dbName)
        console.log(`DB online...!!!`)
        return this.#conexion
    }
}