import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import session from 'express-session'
import connectMongo from 'connect-mongo'
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';

import { router as routerVistas} from './routes/views.router.js';
import { config } from './config/config.js';
import { initPassport } from './config/passport.config.js';
import passport from 'passport';


const PORT=config.PORT;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/public')));

app.use(session({
    secret: config.SECRET_SESSION,
    resave:true, saveUninitialized:true,
    store: connectMongo.create({
        mongoUrl:config.MONGO_URL,
        dbName:config.DB_NAME,
        ttl:3600 
    })
}))

// paso 2
initPassport()
app.use(passport.initialize())
app.use(passport.session())   // solo si usamos sessions


app.get(
    "/api/sessions/callbackGithub",     
    passport.authenticate("github", {failureRedirect: "/error"}), 
    (req, res)=>{

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Login exitoso`, datos: req.user});
    }
)

app.use('/', routerVistas)

app.get(
    "/github", 
    // paso 3
    passport.authenticate("github", {})
)

app.post("/api/sessions/login", passport.authenticate("login", {failureRedirect:"/error"}), 
(req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Login exitoso para ${req.user.nombre}`});
})


app.get("/error", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Error al autenticar`})
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const conectar=async()=>{
    try {
        await mongoose.connect(config.MONGO_URL, {dbName:config.DB_NAME})
        console.log(`Conexión a DB establecida`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();
