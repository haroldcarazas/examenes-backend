import { Router } from 'express'
import { validateAlumno } from '../middleware/alumnos.middleware.js'
import ExamenController from '../controllers/ExamenController.js'
import { validateID } from '../middleware/middleware.js'

const router = Router()

router.get('/me', validateAlumno, ExamenController.me)
router.get('/:id', validateID, validateAlumno, ExamenController.getById)
router.post('/', validateAlumno, ExamenController.store)

export default router
