import { Router } from 'express';
import { createProduct, getProduct, getProducts } from '../controllers/products.controller.js';
import { passportCall } from '../utils.js';
import { auth } from '../middleware/auth.js';
export const router=Router()

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post(
    "/", 
    passportCall("current"), 
    auth(["admin"]),
    createProduct
)