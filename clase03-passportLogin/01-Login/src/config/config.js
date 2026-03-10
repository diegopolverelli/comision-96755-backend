// dotenv
process.loadEnvFile("./.env")

// console.log(process.env.MONGO_URL)

export const config={
    PORT: process.env.PORT || 3000, 
    SECRET: process.env.SECRET || "coderCoder123", 
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME,
}