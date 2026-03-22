import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {
	getStudents,
	getStudentById,
	createStudent,
} from '../controllers/studentController.js'

const router = express.Router()

router.get('/', authMiddleware, getStudents)
router.get('/:id', authMiddleware, getStudentById)
router.post('/', authMiddleware, createStudent)

export default router
