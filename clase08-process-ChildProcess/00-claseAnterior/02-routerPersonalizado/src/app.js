import express from 'express';
import { router as pruebasRouter } from './routes/pruebasRouter.js';
import { ProductsRouter } from './routes/ProductsRouter.js';
const PORT=3000;

const app=express();
const productsRouter=new ProductsRouter()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/pruebas", pruebasRouter)
app.use("/api/products", productsRouter.getRouter())

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
