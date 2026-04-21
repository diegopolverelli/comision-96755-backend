import express from 'express';

// let [ rutaNode, rutaScript, ...argumentos] = process.argv   // ... son REST
let [ , , ...argumentos] = process.argv   // ... son REST
// let {nombre, email}=req.body

// commander

// console.log(argumentos)

let indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`El argumento --port es requerido`)
    process.exit()
}

const PORT=argumentos[indicePort+1];

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
