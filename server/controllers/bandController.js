import Band from '../models/band.js'

export const getBands = async (req, res) => {
	try {
		const bands = await Band.find({
			teacherId: req.user.id,
		}).populate('teacherId', 'name email')

		res.json(bands)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

export const getBandById = async (req, res) => {
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
}

export const createBand = async (req, res) => {
	try {
		if (!req.body.name || !req.body.name.trim()) {
			return res.status(400).json({
				error: 'Band name is required',
			})
		}

		const band = new Band({
			name: req.body.name.trim(),
			teacherId: req.user.id,
		})

		const saved = await band.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}
