import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
	name: { type: String, required: true },
	instrument: { type: String, required: true },
	bandId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Band',
		required: true,
	},
})

const Student = mongoose.model('Student', studentSchema)

export default Student
