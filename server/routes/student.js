import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {
	getStudents,
	getStudentById,
	createStudent,
	updateStudent,
	deleteStudent
} from '../controllers/studentController.js'

const router = express.Router()

router.get('/', authMiddleware, getStudents)
router.get('/:id', authMiddleware, getStudentById)
router.post('/', authMiddleware, createStudent)
router.patch('/:id', authMiddleware, updateStudent)
router.delete('/:id', authMiddleware, deleteStudent)

export default router
