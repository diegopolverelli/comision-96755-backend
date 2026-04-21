import { Router } from 'express';
import { controllerHandler, midd01, midd02, midd03, midd04 } from '../middlewares/middlewares.js';
export const router=Router()

router.get('/', midd01, (req,res)=>{

    let resultado="Pruebas router"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({resultado})
})

let funciones=[]

funciones.push(midd01, midd02, midd03, midd04, controllerHandler)

router.get("/ejemplo", funciones)