import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo } from "../dao/UsuariosManagerMONGO.js"
import { generaHash, validaHash } from "../utils.js"

const usersManager = new UsuariosManagerMongo()

export const configPassport = () => {

    // paso 1
    passport.use("register", new local.Strategy(
        {
            usernameField: "email",
            // passwordField: "clave",
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {  // return done(null, false)  o return done(null, usuario)  o return done(error)
                let { nombre } = req.body
                if (!nombre) {
                    console.log("no completo el nombre")
                    // res.setHeader('Content-Type', 'application/json');
                    // return res.status(400).json({ error: `nombre | email | password son requeridos` })
                    return done(null, false)
                }

                let reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
                // let res=reCorto.test('prueba@correo.com') // true
                if (!reLargo.test(username)) {
                    console.log("email invalido")
                    // res.setHeader('Content-Type', 'application/json');
                    // return res.status(400).json({ error: `Ingrese una dirección de email válida` })
                    return done(null, false)
                }

                let existe = await usersManager.getBy({ email: username })
                if (existe) {
                    console.log(`usuario ya existe...!!!`)
                    // res.setHeader('Content-Type', 'application/json');
                    // return res.status(400).json({ error: `Ya existen usuarios con email ${email}` })
                    return done(null, false)
                }

                // resto validaciones pertinentes...

                password = generaHash(password)

                let nuevoUsuario = await usersManager.create({ nombre, email: username, password })
                return done(null, nuevoUsuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField: "email",
        },
        async (username, password, done) => {
            try {
                // validaciones varias... pertinentes

                let usuario = await usersManager.getBy({ email: username })
                if (!usuario) {
                    // res.setHeader('Content-Type', 'application/json');
                    // return res.status(401).json({ error: `Credenciales inválidas` })
                    return done(null, false)
                }

                if (!validaHash(password, usuario.password)) {
                    // res.setHeader('Content-Type', 'application/json');
                    // return res.status(401).json({ error: `Credenciales inválidas` })
                    return done(null, false)
                }

                delete usuario.password
                return done(null, usuario)

            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1' o 1 bis (solo si usamos sessions)
    passport.serializeUser((user, done) => {
        console.log(user)
        return done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let usuario = await usersManager.getBy({ _id: id })
        return done(null, usuario)
    })
}
