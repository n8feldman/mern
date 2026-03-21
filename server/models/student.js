// models/record.js
import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
	name: { type: String, required: true },
	instrument: { type: String, required: true },
	bandName: { type: String, required: true }
})

const Student = mongoose.model('Student', studentSchema)

export default Student
