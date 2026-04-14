import mongoose from "mongoose";

export const cartModel=mongoose.model(
    "carts",
    new mongoose.Schema(
        {
            products:[]
        }, 
        {
            timestamps: true
        }
    )
)