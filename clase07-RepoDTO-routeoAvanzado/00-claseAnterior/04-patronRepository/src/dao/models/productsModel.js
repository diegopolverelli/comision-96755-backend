import mongoose from "mongoose";

export const productsModel=mongoose.model(
    "products", 
    new mongoose.Schema(
        {
            title: String, 
            price: Number, 
            stock: Number,
        }, 
        {
            timestamps: true, 
            // collection: "productos2021",
        }
    )
)