import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { generaHash, validaHash } from '../utils.js';
import passport from 'passport';
export const router = Router()

const usersManager = new UsuariosManagerMongo()

// router.post('/register', async(req,res)=>{

//     let {nombre, email, password}=req.body
//     if(!nombre || !email || !password){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`nombre | email | password son requeridos`})
//     }

//     let reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
//     // let res=reCorto.test('prueba@correo.com') // true
//     if(!reLargo.test(email)){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`Ingrese una dirección de email válida`})
//     }

//     try {
//         let existe=await usersManager.getBy({email})
//         if(existe){
//             res.setHeader('Content-Type','application/json');
//             return res.status(400).json({error:`Ya existen usuarios con email ${email}`})
//         }

//         // resto validaciones pertinentes...

//         password=generaHash(password)

//         let nuevoUsuario=await usersManager.create({nombre, email, password})

//         res.setHeader('Content-Type','application/json')
//         res.status(200).json({message: `Registro exitoso!`, nuevoUsuario})
//     } catch (error) {
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal Server Error`})
//     }    
// })

router.get("/error", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ payload: `Error al autenticar` });
})

router.post(
    "/register",
    // paso 3
    passport.authenticate("register", { failureRedirect: "/api/sessions/error" }),
    (req, res) => {

        // si passport.authenticate sale OK deja una property user en la req
        // req.user


        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message: `Registro exitoso!`, nuevoUsuario: req.user })
    }
)

// router.post("/login", async(req, res)=>{
//     let {email, password}=req.body
//     if(!email || !password){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`email | password son requeridos`})
//     }

//     // validaciones varias... pertinentes

//     try {
//         let usuario=await usersManager.getBy({email})
//         if(!usuario){
//             res.setHeader('Content-Type','application/json');
//             return res.status(401).json({error:`Credenciales inválidas`})
//         }

//         if(!validaHash(password, usuario.password)){
//             res.setHeader('Content-Type','application/json');
//             return res.status(401).json({error:`Credenciales inválidas`})
//         }

//         delete usuario.password
//         req.session.usuario=usuario

//         res.setHeader('Content-Type','application/json');
//         return res.status(200).json({payload:`Login exitoso para ${usuario.nombre}`, usuario});
//     } catch (error) {
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal Server Error`})
//     }
// })

router.post(
    "/login",
    // paso 3
    passport.authenticate("login", { failureRedirect: "/api/sessions/error" }),
    (req, res) => {

        // req.user viene dado por passport.authenticate si sale OK

        req.session.usuario = req.user

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: `Login exitoso para ${req.user.nombre}`, usuario: req.user });
    }
)

router.get("/logout", (req, res) => {
    req.session.destroy(e => {
        if (e) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ error: `Error al procesar logout` })
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: "Logout exitoso" });
    })
})