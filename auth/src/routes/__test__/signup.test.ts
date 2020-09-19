import request from 'supertest';
import { app } from '../../app';

it('return a 201 on succesfull signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);
});

it('return 400 with invalid email', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'testtest.com',
			password: 'password',
		})
		.expect(400);
});

it('return 400 with invalid password', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'pa',
		})
		.expect(400);
});

it('return 400 with missing email and password', async () => {
	return request(app).post('/api/users/signup').send({}).expect(400);
});

it('disallow duplicate email', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(400);
});

it('sits a cookie after succesfull signup', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
});
