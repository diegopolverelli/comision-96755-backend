import express from 'express';
import { config } from './config/config.js';
// const PORT=3000;
// const PORT=process.env.PORT || 3000;
const PORT=config.general.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
    console.log(`DB online...!!! Nombre DB: ${config.database.DB_NAME}`)
});
