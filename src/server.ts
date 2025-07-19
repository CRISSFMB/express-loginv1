
import express from 'express'
import router from "./router"

const app = express()


app.use(express.json()) // habilitamos el parsing de JSON en el cuerpo de las solicitudes

app.use("/", router)