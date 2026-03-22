import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

router.post('/login', async (req, res) => {
	try {
		const teacher = await Teacher.findOne({
			email: req.body.email,
		})

		if (!teacher) {
			return res.status(400).json({
				error: 'Invalid email',
			})
		}

		const validPassword = await bcrypt.compare(
			req.body.password,
			teacher.password
		)

		if (!validPassword) {
			return res.status(400).json({
				error: 'Invalid password',
			})
		}

		const token = jwt.sign(
			{ id: teacher._id, email: teacher.email },
			'your_jwt_secret'
		)

		res.json({ token })
    
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

export default router
