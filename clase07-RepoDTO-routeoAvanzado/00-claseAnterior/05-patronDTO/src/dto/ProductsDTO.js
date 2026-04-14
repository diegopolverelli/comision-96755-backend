export class ProductsDTO{
    constructor(product){
        this.codigo=product._id
        this.precio=product.price 
        this.descrip=product.title
        this.stock=product.stock
        this.origen="Argentina"
    }
    
}


// {
//     "_id": "69d44839b11d711971f60206",
//     "title": "Clavos 999",
//     "price": 3,
//     "stock": 2,
//     "createdAt": "2026-04-06T23:56:41.878Z",
//     "updatedAt": "2026-04-06T23:56:41.878Z",
//     "__v": 0
//   },