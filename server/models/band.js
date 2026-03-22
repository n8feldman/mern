import mongoose from 'mongoose'

const bandSchema = new mongoose.Schema({
	name: { type: String, required: true },
})

const Band = mongoose.model('Band', bandSchema)

export default Band
