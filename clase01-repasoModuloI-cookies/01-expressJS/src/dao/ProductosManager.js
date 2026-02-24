import { productos } from "../data/productos.js";

export class ProductsManager{

    static async get(){
        return productos
    }

    static async create(product){
        let id=1
        if(productos.length>0){
            id=Math.max(...productos.map(d=>d.id))+1
        }
        
        let nuevoProducto={
            id, 
            ...product,   // los ... son aquí el operador SPREAD
        }

        productos.push(nuevoProducto)

        return nuevoProducto
    }

    // getById, put, delete

    // find(){
    //     return productos
    // }
}

// ProductsManager.get()
// const productManager=new ProductsManager()
// productManager.find()
