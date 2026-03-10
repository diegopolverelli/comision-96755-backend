import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
export const router=Router()

router.get('/',(req,res)=>{

    res.status(200).render('home')
})


router.get('/perfil', auth, (req,res)=>{

    let {nombre, email}=req.user

    res.status(200).render('perfil', {
        nombre, email
    })
})
