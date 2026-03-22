import './db.js'
import express from 'express'

import students from './routes/student.js'
import bands from './routes/band.js'
import teachers from './routes/teacher.js'

const app = express()
const PORT = process.env.PORT || 5050

app.use(express.json())

// sanity check
app.get('/', (req, res) => {
	res.send('Server is running')
})

app.use('/students', students);
app.use('/bands', bands)
app.use('/teachers', teachers)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
