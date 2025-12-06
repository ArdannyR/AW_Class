import {Router} from 'express'
import { registrarPaciente } from '../controllers/paciente_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()

router.post("/paciente/registro",verificarTokenJWT, registrarPaciente)


export default router