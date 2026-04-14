

export class CartsService{
    #cartRepo
    #productRepo

    constructor(cartRepo, productRepo){
        this.#cartRepo=cartRepo
        this.#productRepo=productRepo
    }

    async getCarts(){
        return await this.#cartRepo.getCarts()
    }


    async getCartById(id){
        return await this.#cartRepo.getCartById(id)
    }

    async createCart(){
        return await this.#cartRepo.createCart()
    }

    async addProductToCart(idCart, idProduct){
        let cart=await this.#cartRepo.getCartById({_id:idCart})
        if(!cart) throw new Error(`No existen carts con id ${idCart}`)

        let product=await this.#productRepo.getProductById({_id: idProduct})
        if(!product) throw new Error(`No existen carts con id ${idProduct}`)

        // resto validaciones pertinentes, fomat data, etc... procesamiento info...

        cart.products.push(product)
        return await this.#cartRepo.updateCart(idCart, cart)
    }


}