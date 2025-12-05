import {Router} from 'express'
import { actualizarPerfil, comprobarTokenPasword, confirmarMail, crearNuevoPassword, recuperarPassword, registro, login, perfil, actualizarPassword } from '../controllers/veterinario_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'
const router = Router()


router.post('/registro',registro)
router.get('/confirmar/:token',confirmarMail)

router.post('/recuperarpassword',recuperarPassword)
router.get('/recuperarpassword/:token',comprobarTokenPasword)
router.post('/nuevopassword/:token',crearNuevoPassword)

router.post('/veterinario/login',login)
router.get('/veterinario/perfil',verificarTokenJWT,perfil)

router.put('/actualizarperfil/:id',verificarTokenJWT,actualizarPerfil)
router.put('/actualizarpassword/:id',verificarTokenJWT,actualizarPassword)

export default router