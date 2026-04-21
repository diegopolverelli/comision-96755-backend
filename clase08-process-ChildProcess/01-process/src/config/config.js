import dotenv from "dotenv"

let [ , , ...argumentos] = process.argv   // ... son REST
// let {nombre, email}=req.body

// commander

// console.log(argumentos)
let mode="dev"

let indiceMode=argumentos.findIndex(a=>a=="--mode")
if(indiceMode!=-1){
    mode=argumentos[indiceMode+1]
    console.log(mode)
    if(mode.toLowerCase()!="dev" && mode.toLowerCase()!="prod"){
        console.log(`Los valores posibles para --mode son [dev, prod]`)
        process.exit()
    }
}


dotenv.config(
    {
        override: true, 
        quiet: true, 
        path: mode=="dev"?"./.env.dev":"./.env.production"
    }
)



export const config={
    general:{
        PORT: process.env.PORT || 3000, 
        SECRET: process.env.SECRET, 
    }, 
    database: {
        MONGO_URL: process.env.MONGO_URL, 
        DB_NAME: process.env.DB_NAME,
    },
}
