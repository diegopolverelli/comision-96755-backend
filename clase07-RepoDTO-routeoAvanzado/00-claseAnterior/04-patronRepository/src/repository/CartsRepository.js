

export class CartsRepository{
    #cartDAO
    constructor(cartDAO){
        this.#cartDAO=cartDAO
    }

    async getCarts(){
        return await this.#cartDAO.getAll()
    }


    async getCartById(id){
        return await this.#cartDAO.getOneBy(id)
    }

    async createCart(){
        return await this.#cartDAO.create()
    }

    async updateCart(idCart, cart){
        return await this.#cartDAO.update(idCart, cart)
    }

}