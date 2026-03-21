// routes/student.js
import express from 'express'
import Student from '../models/student.js'

const router = express.Router()

// GET all students
router.get('/', async (req, res) => {
	try {
		const students = await Student.find()
		res.json(students)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// POST a new student
router.post('/', async (req, res) => {
	try {
		const student = new Student(req.body)
		const saved = await student.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

export default router
