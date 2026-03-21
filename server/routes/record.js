// routes/record.js
import express from 'express'
import Record from '../models/record.js'

const router = express.Router()

// GET all band members
router.get('/', async (req, res) => {
	try {
		const members = await Record.find()
		res.json(members)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

// POST a new band member
router.post('/', async (req, res) => {
	try {
		const member = new Record(req.body)
		const saved = await member.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

export default router
