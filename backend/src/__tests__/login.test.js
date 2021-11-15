import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import app from '../app';
import { connectToDb } from '../db';
import User from '../models/User';

async function hashPassword(pw) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pw, salt);
}

beforeEach(async () => {
  await connectToDb();
});

afterEach(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe('POST /api/login', () => {
  describe('given an email and a password', () => {
    test('should respond with status code 200 and send back user', async () => {
      const userData = {
        email: 'test@test.com',
        password: 'T3stP4ssw0rd',
      };
      const hashedPassword = await hashPassword(userData.password);
      userData.password = hashedPassword;
      await User.create(userData);
      const response = await request(app).post('/api/login').send({
        email: 'test@test.com',
        password: 'T3stP4ssw0rd',
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
    });
  });

  describe('given an email that is not exists and a password', () => {
    test('should respond with status 400 and error message', async () => {
      const userData = {
        email: 'test@test.com',
        password: 'T3stP4ssw0rd',
      };
      const hashedPassword = await hashPassword(userData.password);
      userData.password = hashedPassword;
      await User.create(userData);
      const response = await request(app).post('/api/login').send({
        email: 'wrong@test.com',
        password: 'T3stP4ssw0rd',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('No user found with this email');
    });
  });

  describe('given a password but no email', () => {
    test('should respond with status 400 and error message', async () => {
      const userData = {
        email: 'test@test.com',
        password: 'T3stP4ssw0rd',
      };
      const hashedPassword = await hashPassword(userData.password);
      userData.password = hashedPassword;
      await User.create(userData);
      const response = await request(app).post('/api/login').send({
        email: '',
        password: 'T3stP4ssw0rd',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing email');
    });
  });

  describe('given an email but no password', () => {
    test('should respond with status 400 and error message', async () => {
      const userData = {
        email: 'test@test.com',
        password: 'T3stP4ssw0rd',
      };
      const hashedPassword = await hashPassword(userData.password);
      userData.password = hashedPassword;
      await User.create(userData);
      const response = await request(app).post('/api/login').send({
        email: 'test@test.com',
        password: '',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing password');
    });
  });

  describe('given an email and invalid password', () => {
    test('should respond with status 400 and error message', async () => {
      const userData = {
        email: 'test@test.com',
        password: 'T3stP4ssw0rd',
      };
      const hashedPassword = await hashPassword(userData.password);
      userData.password = hashedPassword;
      await User.create(userData);
      const response = await request(app).post('/api/login').send({
        email: 'test@test.com',
        password: 'invalidpassword',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Invalid password');
    });
  });
});
