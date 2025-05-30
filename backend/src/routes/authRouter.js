import { Router } from 'express'
import { createAccount, loginUser } from '../controllers/authController.js'

const router = Router()

router.post('/create-account', createAccount)
router.post('/login', loginUser)

export default router