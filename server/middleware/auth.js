import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
	try {
		const authHeader = req.header('Authorization')

		if (!authHeader) {
			return res.status(401).json({ error: 'No token provided' })
		}

		const token = authHeader.replace('Bearer ', '')

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = decoded

		next()
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({
				error: 'Token expired',
			})
		}

		return res.status(401).json({
			error: 'Invalid token',
		})
	}
}

export default authMiddleware
