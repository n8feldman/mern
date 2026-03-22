import express from 'express'
import { registerTeacher, loginTeacher, getMe } from '../controllers/authController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/register', registerTeacher)
router.post('/login', loginTeacher)
router.get('/me', authMiddleware, getMe)

export default router
