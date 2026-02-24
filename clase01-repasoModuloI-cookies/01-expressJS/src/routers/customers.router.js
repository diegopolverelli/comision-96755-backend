import { Router } from 'express';
export const router=Router()

router.get('/',(req,res)=>{

    let clientes="clientes"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({clientes})
})