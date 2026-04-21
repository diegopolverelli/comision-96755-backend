// process.loadEnvFile("./.env")
import dotenv from "dotenv"

dotenv.config({
    path:"./.env", 
    quiet: true,
    override: true, 
})

console.log(process.env.PORT)
console.log(process.env.SECRET)
console.log(process.env.MONGO_URL)
console.log(process.env.PRUEBA_SECRET)
console.log(process.env.PRUEBA_PORT)