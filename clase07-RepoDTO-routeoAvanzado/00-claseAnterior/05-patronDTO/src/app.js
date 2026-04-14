import express from 'express';
import fs from 'fs'
import cors from "cors"
import bcrypt from "bcrypt"
import passport from 'passport';
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { iniciarPassport } from './config/passport.config.js';
import { config } from './config/config.js';
import { passportCall } from './utils.js';
import { auth } from './middleware/auth.js';
import { router as sessionsRouter } from './routes/sessions.router.js';
import { router as cartsRouter } from './routes/carts.router.js';
import { router as productsRouter } from './routes/products.router.js';
import { Singleton } from './config/database.config.js';
import mongoose from 'mongoose';

const PORT=3000;

const app=express();

iniciarPassport()
app.use(passport.initialize())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cors({origin:["http://127.0.0.1:5500", "http://miempresa.com:80"], }))

app.use(
    "/api/products", 
    // cors(), 
    productsRouter
)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionsRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

// let usuarios=[]
// if(fs.existsSync('./src/usuarios.json')){
//     usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf-8'))
// }

// app.post('/registro',(req,res)=>{
//     let {nombre, email, password}=req.body
//     if(!nombre || !email || !password) return res.status(400).send({error:'Ingrese todos los datos'})

//     let usuario=usuarios.find(u=>u.email===email)
//     if(usuario) return res.status(400).send({error:`El usuario ${email} ya existe en la DB`})

//     let id=1
//     if(usuarios.length>0) id=usuarios[usuarios.length-1].id+1

//     usuario={
//         id, 
//         nombre, 
//         email, 
//         password: bcrypt.hashSync(password, 10), 
//         rol: "user"
//     }

//     usuarios.push(usuario)

//     fs.writeFileSync('./src/usuarios.json',JSON.stringify(usuarios,null,5))

//     res.json({
//         usuarioCreado:usuario
//     })
// })

// app.post('/login',(req,res)=>{
//     let {email, password}=req.body
//     if(!email || !password) return res.status(400).send({error:'Ingrese email y password'})

//     usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))

//     let usuario=usuarios.find(u=>u.email===email)
//     if(!usuario) return res.status(400).send({error:`Error credenciales`})
    
//     if(!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({error:`Error credenciales`})

//     let userToken={...usuario}
//     delete userToken.password
//     let token=jwt.sign(userToken, config.SECRET, {expiresIn: "1h"})

//     res.cookie("cookietoken", token, {httpOnly:true})
//     return res.status(200).json({
//         usuarioLogueado:userToken,
//     })

// })

app.get('/usuario', passportCall("current"), auth(["user", "admin"]), (req,res)=>{


    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:'Perfil usuario',
    });
});

app.get('/admin', passportCall("current"), auth(["admin"]), (req,res)=>{


    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:'Perfil usuario',
    });
});


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


Singleton.conectarDB(
    config.MONGO_URL, 
    config.DB_NAME
)

// Singleton.conectarDB(
//     config.MONGO_URL, 
//     config.DB_NAME
// )
// Singleton.conectarDB(
//     config.MONGO_URL, 
//     config.DB_NAME
// )
// Singleton.conectarDB(
//     config.MONGO_URL, 
//     config.DB_NAME
// )
// Singleton.conectarDB(
//     config.MONGO_URL, 
//     config.DB_NAME
// )