import { Router } from 'express';
import { logger } from '../middleware/log.js';
export const router=Router()

// router.use(logger)

router.get('/',(req,res)=>{

    let productos="Listado productos"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({productos})
})