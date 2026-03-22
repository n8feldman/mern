// routes/band.js
import express from 'express'
import Band from '../models/band.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// GET all bands
router.get('/', authMiddleware, async (req, res) => {
	try {
		const bands = await Band.find({
			teacherId: req.user.id,
		}).populate('teacherId', 'name email')

		res.json(bands)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// GET by band ID
router.get('/:id', authMiddleware, async (req, res) => {
	try {
		const band = await Band.findOne({
			_id: req.params.id,
			teacherId: req.user.id,
		}).populate('teacherId', 'name email')

		if (!band) {
			return res.status(404).json({
				error: 'Band not found',
			})
		}

		res.json(band)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// POST new band
router.post('/', authMiddleware, async (req, res) => {
	try {
		const band = new Band({
			name: req.body.name,
			teacherId: req.user.id,
		})
    
		const saved = await band.save()
		res.status(201).json(saved)

	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

export default router