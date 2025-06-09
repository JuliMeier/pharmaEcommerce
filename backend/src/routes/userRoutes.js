import { Router } from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser, updateUserPassword} from '../controllers/userController.js'
import { authenticate } from '../middleware/authenticate.js'
import { authorizeAdmin } from '../middleware/authorizeAdmin.js'
import { authorizeSuperAdmin } from '../middleware/authorizeSuperAdmin.js'

const router = Router()

router.get('/', authenticate, authorizeAdmin, getUsers)
router.get('/:id', authenticate, authorizeAdmin, getUserById)
router.post('/', authenticate, authorizeSuperAdmin, createUser)
router.put('/:id', authenticate, authorizeSuperAdmin, updateUser)
router.delete('/:id', authenticate, authorizeSuperAdmin, deleteUser)
router.put('/:id/password', authenticate, updateUserPassword)

export default router