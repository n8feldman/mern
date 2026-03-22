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