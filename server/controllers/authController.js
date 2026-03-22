import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Teacher from '../models/teacher.js'

export const registerTeacher = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)

		const teacher = new Teacher({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		})

		const saved = await teacher.save()

		res.status(201).json({
			_id: saved._id,
			name: saved.name,
			email: saved.email,
		})
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

export const loginTeacher = async (req, res) => {
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
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN }
		)

		res.json({ token })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

export const getMe = async (req, res, next) => {
	try {
		const teacher = await Teacher.findById(req.user.id).select('_id name email')

		if (!teacher) {
			return res.status(404).json({
				error: 'User not found',
			})
		}

		res.json(teacher)
	} catch (err) {
		next(err)
	}
}