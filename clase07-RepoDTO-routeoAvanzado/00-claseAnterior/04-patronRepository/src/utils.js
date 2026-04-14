import { fileURLToPath } from 'url';
import { dirname } from 'path';
import passport from 'passport';
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const passportCall = estrategia => function (req, res, next) {
  passport.authenticate(estrategia, function (err, user, info, status) {
    if (err) { return next(err) }
    if (!user) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: `${info.message ? info.message : info.toString()}` })
    }
    req.user = user
    return next()
  })(req, res, next);
}

export const generateHash=password=>bcrypt.hashSync(password, 10)
export const validatePass=(pass, hash)=>bcrypt.compareSync(pass, hash)


export const manejaErrores=(res, error)=>{
  res.setHeader('Content-Type','application/json');
  return res.status(500).json({error:`Error: ${error.message}`})
}

