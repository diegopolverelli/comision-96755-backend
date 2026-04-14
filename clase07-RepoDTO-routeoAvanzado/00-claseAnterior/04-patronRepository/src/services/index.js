import { CartsDAO } from "../dao/CartsDAO.js";
import { ProductsDAO } from "../dao/ProductsDAO.js";
import { CartsRepository } from "../repository/CartsRepository.js";
import { ProductsRepository } from "../repository/ProductsRepository.js";
import { CartsService } from "./Carts.Service.js";
import { ProductService } from "./Products.Service.js";


const productsDAO=new ProductsDAO()
const productRepo=new ProductsRepository(productsDAO)
export const productService=new ProductService(productRepo)

const cartsDAO=new CartsDAO()
const cartsRepo=new CartsRepository(cartsDAO)
export const cartService=new CartsService(cartsRepo, productRepo)