// Requerir módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerVeterinarios from './routers/veterinario_routes.js'
import cloudinary from 'cloudinary'
import fileUpload from "express-fileupload"
import routerPacientes from './routers/paciente_routes.js'

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 

// Middlewares 
app.use(express.json())
app.use(cors())

// Variables globales
app.set('port',process.env.PORT || 3000)

// Ruta principal
app.get('/',(req,res)=>res.send("Server on"))

// Rutas para veterinarios
app.use('/api',routerVeterinarios)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Rutas para pacientes
app.use('/api',routerPacientes)

// Exportar la instancia de express por medio de app
export default  app

// Configuraciones de cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Middlewares
app.use(express.json())
app.use(cors())
 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}))
