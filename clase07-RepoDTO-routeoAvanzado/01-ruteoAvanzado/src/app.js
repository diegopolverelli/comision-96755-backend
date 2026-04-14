import express from 'express';
import { router as productsRouter } from './routes/productsRouter.js';
import { config } from './config/config.js';
import { logger } from './middleware/log.js';
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(logger)

const version=config.VERSION

app.use(`/api/${version}/products`, logger, productsRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get(/^\/prueba[0-9]*$/ , (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"ruta prueba"});
})

app.get("/producto/:codigo([a-zA-Z][0-9]+)", (req, res)=>{

    // letra+digitos (formato codigo producto)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:{
        codigo: req.params.codigo
    }});
})


//  /producto/A999
app.get("/producto/otros/:codigo([A-Z][0-9][0-9][0-9])", (req, res)=>{

    // letra+digitos (formato codigo producto)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:{
        codigo2: req.params.codigo
    }});
})

let usuarios=[
    {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
    {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
    {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
]

app.param("id", (req, res, next, id)=>{

    let usuario=usuarios.find(u=>u.id==id)
    if(!usuario) usuario=`No existe usuario con id ${id}`

    req.user=usuario

    next()
})

app.get("/usuarios/:id", (req, res)=>{

    // let {id}=req.params

    // let usuario=usuarios.find(u=>u.id==id)
    // if(!usuario) usuario=`No existe usuario con id ${id}`

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload: req.user});

})


app.get("/usuarios/:id/cursos", (req, res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload: req.user, cursos:"cursos user..."});

})



app.get("*", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(404).json({payload:"Page not found"});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
