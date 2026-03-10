import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


export const generaHash=password=>bcrypt.hashSync(password, 10)
export const validaHash=(password, hash)=>bcrypt.compareSync(password, hash)