import express from 'express'
import bcrypt from 'bcrypt'
import Teacher from '../models/teacher.js'

const router = express.Router()

router.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)

		const teacher = new Teacher({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		})

		const saved = await teacher.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

export default router
