

export class ProductsRepository{
    #productsDAO
    constructor(productsDAO){
        this.#productsDAO=productsDAO
    }

    async getProducts(){
        return await this.#productsDAO.getAll()
    }

    async getProductById(id){
        return await this.#productsDAO.getOneBy({_id: id})
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