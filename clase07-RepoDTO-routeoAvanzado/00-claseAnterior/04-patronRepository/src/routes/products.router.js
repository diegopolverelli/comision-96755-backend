import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/products.controller.js';
import { passportCall } from '../utils.js';
import { auth } from '../middleware/auth.js';
export const router=Router()

router.get("/", getProducts)
router.post(
    "/", 
    passportCall("current"), 
    auth(["admin"]),
    createProduct
)