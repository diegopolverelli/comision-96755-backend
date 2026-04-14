import passport from "passport"
import passportJWT from "passport-jwt"
import local from "passport-local"
import { config } from "./config.js"
import { UsersDAO } from "../dao/UsersDAO.js"
import { generateHash, validatePass } from "../utils.js"
import { ifError } from "assert"

const usersDAO=new UsersDAO()

const buscarToken=req=>{
    let token=null

    if(req.cookies.cookietoken) token=req.cookies.cookietoken

    return token
}

export const iniciarPassport=()=>{
    // login
    passport.use(
        "login", 
        new local.Strategy(
            {
                usernameField: "email",
            }, 
            async(username, password, done)=>{
                try {
                    let usuario=await usersDAO.getOneBy({email: username})
                    if(!usuario){
                        return done(null, false, {message: "Credenciales inválidas"})
                    }

                    if(!validatePass(password, usuario.password)){
                        return done(null, false, {message: "Credenciales inválidas"})
                    }

                    return done(null, usuario)
                } catch (error) {
                    return done(ifError)
                }
            }
        )
    )

    // registro
    passport.use(
        "registro",
        new local.Strategy(
            {
                passReqToCallback: true, 
                usernameField: "email",
            }, 
            async(req, username, password, done)=>{
                try {
                    let {nombre, rol}=req.body
                    if(!nombre){
                        return done(null, false, {message: `Nombre es requerido...!!!`})
                    }

                    let existe=await usersDAO.getOneBy({email: username})
                    if(existe){
                        return done(null, false, {message: `Ya existe un usuario registrado con email ${username}`})
                    }

                    password=generateHash(password)

                    let nuevoUsuario=await usersDAO.create({nombre, email: username, password, rol})
                    return done(null, nuevoUsuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    // current
    passport.use(
        "current", 
        new passportJWT.Strategy(
            {
                secretOrKey: config.SECRET, 
                jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
            }, 
            async (usuario, done)=>{
                try {
                    // return done(null, false, {message:"info del error"})
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    // no uso sessions, no van...!!!
    // passport.serializeUser

}