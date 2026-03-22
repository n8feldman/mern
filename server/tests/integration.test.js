import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import Teacher from '../models/teacher.js'
import Band from '../models/band.js'
import Student from '../models/student.js'

const TEST_EMAIL = 'integration_test@example.com'
const TEST_PASSWORD = 'testpassword123'

let token
let bandId
let studentId

beforeAll(async () => {
	await Teacher.deleteOne({ email: TEST_EMAIL })
})

afterAll(async () => {
	await Teacher.deleteOne({ email: TEST_EMAIL })
	if (bandId) await Band.deleteOne({ _id: bandId })
	if (studentId) await Student.deleteOne({ _id: studentId })
	await mongoose.connection.close()
})

describe('Auth', () => {
	it('registers a teacher', async () => {
		const res = await request(app).post('/auth/register').send({
			name: 'Test Teacher',
			email: TEST_EMAIL,
			password: TEST_PASSWORD,
		})
		expect(res.status).toBe(201)
		expect(res.body.email).toBe(TEST_EMAIL)
	})

	it('rejects duplicate registration', async () => {
		const res = await request(app).post('/auth/register').send({
			name: 'Test Teacher',
			email: TEST_EMAIL,
			password: TEST_PASSWORD,
		})
		expect(res.status).toBe(400)
	})

	it('logs in and returns a token', async () => {
		const res = await request(app).post('/auth/login').send({
			email: TEST_EMAIL,
			password: TEST_PASSWORD,
		})
		expect(res.status).toBe(200)
		expect(res.body.token).toBeDefined()
		token = res.body.token
	})

	it('rejects login with wrong password', async () => {
		const res = await request(app).post('/auth/login').send({
			email: TEST_EMAIL,
			password: 'wrongpassword',
		})
		expect(res.status).toBe(400)
	})

	it('GET /auth/me returns the logged-in teacher', async () => {
		const res = await request(app)
			.get('/auth/me')
			.set('Authorization', `Bearer ${token}`)
		expect(res.status).toBe(200)
		expect(res.body.email).toBe(TEST_EMAIL)
	})

	it('GET /auth/me rejects missing token', async () => {
		const res = await request(app).get('/auth/me')
		expect(res.status).toBe(401)
	})
})

describe('Bands', () => {
	it('creates a band', async () => {
		const res = await request(app)
			.post('/bands')
			.set('Authorization', `Bearer ${token}`)
			.send({ name: 'Jazz Band' })
		expect(res.status).toBe(201)
		expect(res.body.name).toBe('Jazz Band')
		bandId = res.body._id
	})

	it('rejects band creation without a name', async () => {
		const res = await request(app)
			.post('/bands')
			.set('Authorization', `Bearer ${token}`)
			.send({})
		expect(res.status).toBe(400)
	})

	it('gets all bands', async () => {
		const res = await request(app)
			.get('/bands')
			.set('Authorization', `Bearer ${token}`)
		expect(res.status).toBe(200)
		expect(Array.isArray(res.body)).toBe(true)
	})

	it('gets a band by id', async () => {
		const res = await request(app)
			.get(`/bands/${bandId}`)
			.set('Authorization', `Bearer ${token}`)
		expect(res.status).toBe(200)
		expect(res.body._id).toBe(bandId)
	})

	it('returns 404 for a non-existent band', async () => {
		const res = await request(app)
			.get('/bands/000000000000000000000000')
			.set('Authorization', `Bearer ${token}`)
		expect(res.status).toBe(404)
	})
})

describe('Students', () => {
	it('creates a student', async () => {
		const res = await request(app)
			.post('/students')
			.set('Authorization', `Bearer ${token}`)
			.send({ name: 'Alice', instrument: 'Trumpet', bandId })
		expect(res.status).toBe(201)
		expect(res.body.name).toBe('Alice')
		studentId = res.body._id
	})

	it('rejects student creation without required fields', async () => {
		const res = await request(app)
			.post('/students')
			.set('Authorization', `Bearer ${token}`)
			.send({ name: 'Bob' })
		expect(res.status).toBe(400)
	})

	it('gets all students', async () => {
		const res = await request(app)
			.get('/students')
			.set('Authorization', `Bearer ${token}`)
		expect(res.status).toBe(200)
		expect(Array.isArray(res.body)).toBe(true)
	})

	it('gets a student by id', async () => {
		const res = await request(app)
			.get(`/students/${studentId}`)
			.set('Authorization', `Bearer ${token}`)
		expect(res.status).toBe(200)
		expect(res.body._id).toBe(studentId)
	})

	it('updates a student', async () => {
		const res = await request(app)
			.patch(`/students/${studentId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({ instrument: 'Saxophone' })
		expect(res.status).toBe(200)
		expect(res.body.instrument).toBe('Saxophone')
	})

	it('rejects update with blank name', async () => {
		const res = await request(app)
			.patch(`/students/${studentId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({ name: '   ' })
		expect(res.status).toBe(400)
	})

	it('deletes a student', async () => {
		const res = await request(app)
			.delete(`/students/${studentId}`)
			.set('Authorization', `Bearer ${token}`)
		expect(res.status).toBe(200)
		expect(res.body.message).toBe('Student deleted')
		studentId = null
	})

	it('returns 404 for deleted student', async () => {
		const res = await request(app)
			.get(`/students/000000000000000000000000`)
			.set('Authorization', `Bearer ${token}`)
		expect(res.status).toBe(404)
	})
})
