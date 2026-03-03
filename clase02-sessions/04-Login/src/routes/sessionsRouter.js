import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { generaHash } from '../utils.js';
export const router=Router()

const usersManager=new UsuariosManagerMongo()

router.post('/register', async(req,res)=>{

    let {nombre, email, password}=req.body
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre | email | password son requeridos`})
    }

    let reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    // let res=reCorto.test('prueba@correo.com') // true
    if(!reLargo.test(email)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese una dirección de email válida`})
    }

    try {
        let existe=await usersManager.getBy({email})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existen usuarios con email ${email}`})
        }

        // resto validaciones pertinentes...

        password=generaHash(password)

        let nuevoUsuario=await usersManager.create({nombre, email, password})

        res.setHeader('Content-Type','application/json')
        res.status(200).json({message: `Registro exitoso!`, nuevoUsuario})
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }    
})