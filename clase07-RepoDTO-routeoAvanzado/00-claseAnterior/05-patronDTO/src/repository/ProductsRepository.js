import { ProductsDTO } from "../dto/ProductsDTO.js"


export class ProductsRepository{
    #productsDAO
    constructor(productsDAO){
        this.#productsDAO=productsDAO
    }

    async getProducts(){
        let products=await this.#productsDAO.getAll()
        products=products.map(p=>new ProductsDTO(p))
        return products
    }

    async getProductById(id){
        return new ProductsDTO(await this.#productsDAO.getOneBy({_id: id}))
    }

    async getProductByTitle(title){
        return await this.#productsDAO.getOneBy({title})
    }

    async createProduct(product){

        // validaciones, formateo datos, etc
        product.title=product.title.toUpperCase()

        return await this.#productsDAO.create(product)
    }
}