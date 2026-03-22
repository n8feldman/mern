// routes/band.js
import express from 'express'
import Band from '../models/band.js'

const router = express.Router()

// GET all bands
router.get('/', async (req, res) => {
	try {
		const filter = {}

		if (req.query.teacherId) {
			filter.teacherId = req.query.teacherId
		}

		const bands = await Band.find(filter).populate('teacherId', 'name email')

		res.json(bands)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// POST new band
router.post('/', async (req, res) => {
	try {
		const band = new Band(req.body)
		const saved = await band.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

export default router