import cors from "cors"
import { Router } from 'express';
import { addProductToCart, createCart, getCarts } from '../controllers/carts.controller.js';
export const router=Router()

// router.use(cors())

router.get('/', getCarts)
router.post("/", createCart)
router.put("/:idCart/product/:idProduct", addProductToCart)