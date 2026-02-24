import express from 'express';
import { middLog } from './middlewares/log.js';
import { auth } from './middlewares/auth.js';

import { router as productsRouter } from './routers/products.router.js';
import { router as clientesRouter } from './routers/customers.router.js';
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(middLog)

app.use("/api/products", productsRouter)
app.use("/api/customers", clientesRouter)

app.get('/', middLog, (req, res) => {


    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

app.get('/prueba', (req, res) => {


    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>prueba</h1>');
})

app.get(
    '/datos',
    auth,
    (req, res) => {


        res.setHeader('Content-Type', 'text/html');
        res.status(200).send('<h1>Datos confidenciales...!!!</h1>');
    }
)


const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

