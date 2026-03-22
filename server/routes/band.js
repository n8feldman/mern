import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {
	getBands,
	getBandById,
	createBand,
} from '../controllers/bandController.js'

const router = express.Router()

router.get('/', authMiddleware, getBands)
router.get('/:id', authMiddleware, getBandById)
router.post('/', authMiddleware, createBand)

export default router
