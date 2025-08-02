import express from 'express'
// Importar dotenv para manejar variables de entorno
import "dotenv/config"
import { connectDB } from './config/db'
import router from './router'
import { corsConfig } from './config/cors';
import cors from "cors"
connectDB()


const app = express()

//cors
app.use(cors(corsConfig))



// Conectar a la base de datos
// Middleware para manejar JSON
app.use(express.json())

app.use("/", router)

export default app