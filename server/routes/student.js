// routes/student.js
import express from 'express'
import Student from '../models/student.js'
import Band from '../models/band.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// GET all students
router.get('/', authMiddleware, async (req, res) => {
	try {
		const bands = await Band.find({
			teacherId: req.user.id,
		})

		const bandIds = bands.map((band) => band._id)

		const students = await Student.find({
			bandId: { $in: bandIds },
		}).populate('bandId')

		res.json(students)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// POST a new student
router.post('/', authMiddleware, async (req, res) => {
	try {
		const band = await Band.findOne({
			_id: req.body.bandId,
			teacherId: req.user.id,
		})

		if (!band) {
			return res.status(403).json({
				error: 'You cannot add students to this band',
			})
		}

		const student = new Student({
			name: req.body.name,
			instrument: req.body.instrument,
			bandId: req.body.bandId,
		})

		const saved = await student.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

export default router
