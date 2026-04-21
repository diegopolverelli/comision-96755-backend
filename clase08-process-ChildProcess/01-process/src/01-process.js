import fs from "fs"

console.log("cwd", process.cwd())
console.log("platform", process.platform)
console.log("memoryUsage", process.memoryUsage())

console.log("env", process.env)
console.log("java_home", process.env.JAVA_HOME)
console.log("prueba_port", process.env.PRUEBA_PORT)
console.log("prueba_secret", process.env.PRUEBA_SECRET)

console.log("argumentos por consola", process.argv)