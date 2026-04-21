process.on("SIGINT", ()=>{
    console.log(`Se ejecuto ctrl+C... cerrando de manera correcta el sistema`)
    process.exit()
})

process.on("exit", code=>{
    console.log(`Cerrando con codigo ${code}... Procesos de cierre seguro del sistema`)
})

process.on("uncaughtException", (error)=>{
    console.log(`Se detecto un error no controlado... ${error.message}`)
    console.log("Guardando logs, cerrando correctamente sistema")
    process.exit()
})

let contador=0
const i1=setInterval(() => {
    contador ++
    console.log(`operación ${contador}`)
    if(contador>5){
        clearInterval(i1)
    }
}, 1000);

setTimeout(() => {
    throw new Error("error de pruebas...!!!")
}, 3000);