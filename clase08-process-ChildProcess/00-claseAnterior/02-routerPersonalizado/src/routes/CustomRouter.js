import {Router} from "express"

export class CustomRouter{

    #router
    constructor(){
        this.#router=Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.#router
    }

    get1(ruta, ...funciones){   // ... son aquí el operador REST
        this.#router.get(ruta, this.customResponses, this.procesaFunciones(funciones))   // get("/prueba1", midd01, midd02, (req, res, next)=>{}, ... (req, res)=>{...})
    }

    post1(ruta, ...funciones){   // ... son aquí el operador REST
        this.#router.post(ruta, this.customResponses, this.procesaFunciones(funciones))   // get("/prueba1", midd01, midd02, (req, res, next)=>{}, ... (req, res)=>{...})
    }

    procesaFunciones=funciones=>{
        return funciones.map(fn=>{
            return async(...params)=>{   // ... son REST (req, res) o (req, res, next)
                try {
                    return fn(...params)   // ... son SPREAD
                } catch (error) {
                    // return params[1].status(500).send({error: error.message})
                    return params[1].internalservererror(error.message)
                }
            }
        })
    }

    customResponses(req, res, next){
        res.success=(message, data)=>{
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({status: "OK", message, data, });
        }

        res.badrequest=error=>{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({status: "error", error})
        }

        res.internalservererror=error=>{
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({status: "internal error", error})
        }


        next()
    }

    // middlewares de seguridad 
}

// get("/api/prueba", 1, 2, 3, 4)