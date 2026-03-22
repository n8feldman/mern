import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
	try {
		const authHeader = req.header('Authorization')

		if (!authHeader) {
			return res.status(401).json({ error: 'No token provided' })
		}

		const token = authHeader.replace('Bearer ', '')

		const decoded = jwt.verify(token, 'your_jwt_secret')

		req.user = decoded

		next()
	} catch (err) {
		res.status(401).json({ error: 'Invalid token' })
	}
}

export default authMiddleware
