import { Router } from 'express'
import { registrarTratamiento, eliminarTratamiento } from '../controllers/tratamiento_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'
const router = Router()


router.post('/tratamiento/registro',verificarTokenJWT,registrarTratamiento)

router.delete('/tratamiento/eliminar/:id', verificarTokenJWT,eliminarTratamiento)

export default router