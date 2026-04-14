import { cartService } from "../services/index.js"
import { manejaErrores } from "../utils.js"

export const getCarts=async(req, res)=>{
    try {
        let carts=await cartService.getCarts()

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:carts});
    } catch (error) {
        manejaErrores(res, error)
    }
}

export const createCart=async(req, res)=>{
    try {
        let newCart=await cartService.createCart()

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:newCart});        
    } catch (error) {
        manejaErrores(res, error)        
    }
}

export const addProductToCart=async(req, res)=>{
    // /:idCart/product/:idProduct
    let {idCart, idProduct}=req.params

    try {
        let updatedCart=await cartService.addProductToCart(idCart, idProduct)

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:updatedCart});        
    } catch (error) {
        manejaErrores(res, error)          
    }
}