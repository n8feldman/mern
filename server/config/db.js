import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
	.connect(uri)
	.then(() => console.log('MongoDB connected via Mongoose!'))
	.catch((err) => console.error('MongoDB connection error:', err))
