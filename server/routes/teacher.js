import express from 'express'
import Teacher from '../models/teacher.js'

const router = express.Router()

router.post('/', async (req, res) => {
	try {
		const teacher = new Teacher(req.body)
		const saved = await teacher.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

router.get('/', async (req, res) => {
	try {
		const teachers = await Teacher.find()
		res.json(teachers)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

export default router
