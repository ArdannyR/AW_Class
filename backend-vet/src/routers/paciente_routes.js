import {Router} from 'express'
import { listarPacientes, registrarPaciente, detallePaciente, eliminarPaciente, actualizarPaciente } from '../controllers/paciente_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'
const router = Router()

router.post("/paciente/registro",verificarTokenJWT, registrarPaciente)
router.get("/pacientes",verificarTokenJWT,listarPacientes)
router.get("/paciente/:id", verificarTokenJWT, detallePaciente)
router.delete("/paciente/eliminar/:id", verificarTokenJWT,eliminarPaciente)
router.put("/paciente/actualizar/:id", verificarTokenJWT,actualizarPaciente)

export default router