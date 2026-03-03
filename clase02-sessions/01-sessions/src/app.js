import express from 'express';
import sessions from "express-session"
import { config } from './config/config.js';
import { auth } from './middleware/auth.js';
import { authRoles, isUser } from './middleware/authRoles.js';
const PORT = config.PORT;

const app = express();

app.use(sessions({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {

    // }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {

    let message
    if (req.session.contador) {
        req.session.contador = req.session.contador + 1
        message = `Visitas al home: ${req.session.contador}`
    } else {
        req.session.contador = 1
        message = `Home Page`
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ message });
})

let usuarios = [
    { id: 1, nombre: "Luciana", email: "luciana@test.com", password: "123", rol: "user" },
    { id: 2, nombre: "Juan", email: "juan@test.com", password: "123", rol: "user" },
    { id: 3, nombre: "Romina", email: "romina@test.com", password: "123", rol: "admin" },
]

app.post("/login", (req, res) => {
    let { email, password } = req.body
    if (!email || !password) {

        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `email | password son requeridos` })
    }


    let usuario = usuarios.find(u => u.email == email && u.password == password)
    if (!usuario) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).json({ error: `Credenciales inválidas` })
    }

    req.session.usuario = usuario

    usuario = { ...usuario }
    delete usuario.password
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: `Login exitoso para ${usuario.nombre}...!!!`, usuario });
})

app.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ error: `Fallo en el proceso de logout` })
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: `Logout exitoso` });
    })
})

app.get(
    "/perfil",
    auth,
    // isUser, 
    authRoles(["root", "user", "manager"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: `Perfil usuario ${req.user.nombre}` });
    }
)


const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
