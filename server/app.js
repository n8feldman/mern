import './config/db.js'
import express from 'express'
import students from './routes/student.js'
import bands from './routes/band.js'
import auth from './routes/auth.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Server is running'))

app.use('/students', students)
app.use('/bands', bands)
app.use('/auth', auth)
app.use(errorHandler)

export default app
