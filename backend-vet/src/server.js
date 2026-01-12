// backend-vet/src/server.js

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerVeterinarios from './routers/veterinario_routes.js'
import routerPacientes from './routers/paciente_routes.js'
import routerTratamientos from './routers/tratamiento_routes.js'
import cloudinary from 'cloudinary'
import fileUpload from "express-fileupload"

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones de Cloudinary (Se cargan al inicio)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
// 1. Primero configuramos CORS y JSON
app.use(express.json())
app.use(cors())

// 2. IMPORTANTE: Aquí configuramos fileUpload para que pueda leer las imágenes y el body
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}))

// Variables globales
app.set('port', process.env.PORT || 3000)

// Ruta principal
app.get('/', (req, res) => res.send("Server on"))

// --- RUTAS ---
// Ahora que los middlewares están cargados, las rutas funcionarán correctamente
app.use('/api', routerVeterinarios)
app.use('/api', routerPacientes)
app.use('/api', routerTratamientos)

// Manejo de rutas no encontradas
app.use((req, res) => res.status(404).send("Endpoint no encontrado - 404"))

export default app