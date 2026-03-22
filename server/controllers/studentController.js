import Student from '../models/student.js'
import Band from '../models/band.js'

export const getStudents = async (req, res) => {
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
}

export const getStudentById = async (req, res) => {
	try {
		const bands = await Band.find({
			teacherId: req.user.id,
		})

		const bandIds = bands.map((band) => band._id)

		const student = await Student.findOne({
			_id: req.params.id,
			bandId: { $in: bandIds },
		}).populate('bandId')

		if (!student) {
			return res.status(404).json({
				error: 'Student not found',
			})
		}

		res.json(student)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

export const createStudent = async (req, res) => {
	try {
		if (!req.body.name || !req.body.name.trim()) {
			return res.status(400).json({
				error: 'Student name is required',
			})
		}

		if (!req.body.instrument || !req.body.instrument.trim()) {
			return res.status(400).json({
				error: 'Instrument is required',
			})
		}

		if (!req.body.bandId) {
			return res.status(400).json({
				error: 'bandId is required',
			})
		}

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
			name: req.body.name.trim(),
			instrument: req.body.instrument.trim(),
			bandId: req.body.bandId,
		})

		const saved = await student.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

export const updateStudent = async (req, res, next) => {
	try {
		const bands = await Band.find({
			teacherId: req.user.id,
		})

		const bandIds = bands.map((b) => b._id)

		const student = await Student.findOne({
			_id: req.params.id,
			bandId: { $in: bandIds },
		})

		if (!student) {
			return res.status(404).json({
				error: 'Student not found',
			})
		}

		if (req.body.name !== undefined) {
			if (!req.body.name.trim()) {
				return res.status(400).json({
					error: 'Name cannot be blank',
				})
			}

			student.name = req.body.name.trim()
		}

		if (req.body.instrument !== undefined) {
			if (!req.body.instrument.trim()) {
				return res.status(400).json({
					error: 'Instrument cannot be blank',
				})
			}

			student.instrument = req.body.instrument.trim()
		}

		const saved = await student.save()

		res.json(saved)
	} catch (err) {
		next(err)
	}
}

export const deleteStudent = async (req, res, next) => {
	try {
		const bands = await Band.find({
			teacherId: req.user.id,
		})

		const bandIds = bands.map((b) => b._id)

		const student = await Student.findOneAndDelete({
			_id: req.params.id,
			bandId: { $in: bandIds },
		})

		if (!student) {
			return res.status(404).json({
				error: 'Student not found',
			})
		}

		res.json({
			message: 'Student deleted',
		})
	} catch (err) {
		next(err)
	}
}