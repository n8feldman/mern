import './db.js'
import express from 'express'
import records from './routes/record.js' // now pointing to our band member routes

const app = express()
const PORT = process.env.PORT || 5050

app.use(express.json())

// sanity check
app.get('/', (req, res) => {
	res.send('Server is running')
})

// use the band member routes
app.use('/record', records)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
