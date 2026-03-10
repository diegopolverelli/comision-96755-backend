import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import sessions from "express-session"
import MongoStore from "connect-mongo"

import { router as sessionsRouter } from './routes/sessionsRouter.js';

import { router as vistasRouter } from './routes/vistas.router.js';
import { config } from './config/config.js';

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.static("./src/public"))

app.use(sessions({
    secret: config.SECRET, 
    saveUninitialized: false, 
    resave: false, 
    store: MongoStore.create(
        {
            mongoUrl: config.MONGO_URL, 
            dbName: config.DB_NAME, 
            ttl: 60*15
        }
    )
}))

app.use("/api/sessions", sessionsRouter)
app.use('/', vistasRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const conectar=async()=>{
    try {
        await mongoose.connect(
            config.MONGO_URL, 
            {
                dbName: config.DB_NAME
            }
        )
        console.log(`Conexión a DB establecida`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();
