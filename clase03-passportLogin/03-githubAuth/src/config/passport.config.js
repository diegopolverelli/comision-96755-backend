import passport from "passport"
import github from "passport-github2"
import local from "passport-local"
import bcrypt from "bcrypt"
import { usuariosModelo } from "../models/usuario.model.js"

export const initPassport=()=>{

    // paso 1
    passport.use("github", new github.Strategy(
        {
            clientID: "de github apps",
            clientSecret: "de github apps",
            callbackURL: "http://localhost:3000/api/sessions/callbackGithub",
        }, 
        async(ac, rt, profile, done)=>{
            try {
                // console.log(profile)
                let email=profile._json.email
                if(!email){
                    return done(null, false)
                }

                let usuario=await usuariosModelo.findOne({email})
                if(!usuario){
                    usuario=await usuariosModelo.create({
                        email, nombre: profile.name, 
                        datosGithub: profile
                    })
                }

                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField: "email"
        }, 
        async (username, password, done)=>{
            try {
                let usuario=await usuariosModelo.findOne({email: username})
                if(!usuario){
                    return done(null, false)
                }

                if(!bcrypt.compareSync(password, usuario.password)){
                    return done(null, false)
                }

                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1 bis  solo si usamos sessions
    passport.serializeUser((user, done)=>{
        return done(null, user)
    })
    passport.deserializeUser((user, done)=>{
        return done(null, user)
    })
}