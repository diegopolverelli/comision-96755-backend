import mongoose from 'mongoose'

export const usuariosModelo = mongoose.model(
    'usuarios',
    new mongoose.Schema(
        {
            nombre: String,
            email: {
                type: String, 
                unique: true
            },
            password: String,
            role: {
                type: String,
                default: "user",
            }
        },
        {
            timestamps: true, 
            // collection: "users2020",
            // strict: false, 
        }
    ))


    // await usuariosModelo.find()