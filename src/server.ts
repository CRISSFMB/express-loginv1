import express from 'express'
// Importar dotenv para manejar variables de entorno
import "dotenv/config"
import { connectDB } from './config/db'
import router from './router'


const app = express()

// Conectar a la base de datos
connectDB()
// Middleware para manejar JSON
app.use(express.json())

app.use("/", router)

export default app