

export class ProductService{

    #productsRepo

    constructor(productsRepo){
        this.#productsRepo=productsRepo
    }

    async getProducts(){
        return await this.#productsRepo.getProducts()
    }

    async getProductById(id){
        return await this.#productsRepo.getProductById({_id: id})
    }

    async getProductByTitle(title){
        return await this.#productsRepo.getProductByTitle({title})
    }

    async createProduct(product){

        // validaciones, formateo datos, etc
        product.title=product.title.toUpperCase()

        return await this.#productsRepo.createProduct(product)
    }

}