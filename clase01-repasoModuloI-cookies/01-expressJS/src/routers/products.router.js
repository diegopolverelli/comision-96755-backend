import { Router } from 'express';
import { ProductsManager } from '../dao/ProductosManager.js';
export const router=Router()

router.get('/',async(req,res)=>{

    // let productos="productos"
    let productos=await ProductsManager.get()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({productos})
})

router.get('/:id',(req,res)=>{

    let productos="producto con id "+req.params.id
    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({productos})
})