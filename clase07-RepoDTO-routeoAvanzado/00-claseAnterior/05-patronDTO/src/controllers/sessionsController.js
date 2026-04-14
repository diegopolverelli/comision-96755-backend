import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

// export const register=(req,res)=>{

    

//     res.setHeader('Content-Type','application/json')
//     res.status(200).json({})
// }

export class SessionsController{
    static register(req,res){
        // logica de negocio...

        res.setHeader('Content-Type','application/json')
        res.status(200).json({payload:"Registro exitoso!", newUser: req.user})
    }


    static login(req,res){
        let token=jwt.sign(req.user, config.SECRET, {expiresIn: "1h"})

        res.cookie("cookietoken", token)
        res.setHeader('Content-Type','application/json')
        res.status(200).json({payload:"Login exitoso!", usuarioLogueado: req.user})
    }

}