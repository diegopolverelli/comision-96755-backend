process.loadEnvFile("./.env")

export const config={
    PORT: process.env.PORT || 3000,
    VERSION: process.env.VERSION || "v1",
}

