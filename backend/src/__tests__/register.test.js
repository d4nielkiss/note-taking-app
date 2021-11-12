import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { connectToDb } from '../db';
import User from '../models/User';

beforeEach(async () => {
  await connectToDb();
});

afterEach(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe('POST /api/register', () => {
  describe('given an email and a password', () => {
    test('should respond with status code 200', async () => {
      const userInfo = {
        email: 'test@email.com',
        password: 'secretPassword',
      };
      const response = await request(app).post('/api/register').send(userInfo);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('given an email but no password', () => {
    test('should respond with status code 400, and error message', async () => {
      const userInfo = {
        email: 'test@email.com',
        password: '',
      };
      const response = await request(app).post('/api/register').send(userInfo);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing password');
    });
  });

  describe('given a password but no email', () => {
    test('should respond with status code 400, and error message', async () => {
      const userInfo = {
        email: '',
        password: 'secretPassword',
      };
      const response = await request(app).post('/api/register').send(userInfo);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing email');
    });
  });

  describe('given an invalid email and a password', () => {
    test('should respond with status code 400, and error message', async () => {
      const userInfo = {
        email: 'email',
        password: 'secretPassword',
      };
      const response = await request(app).post('/api/register').send(userInfo);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Invalid email');
    });
  });

  describe('given an email but an invalid password', () => {
    test('should respond with status code 400, and error message', async () => {
      const userInfo = {
        email: 'test@email.com',
        password: 'short',
      };
      const response = await request(app).post('/api/register').send(userInfo);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Must be longer than 8 characters');
    });
  });

  describe('given a password but an existing email', () => {
    test('should respond with status code 400, and error message', async () => {
      const existingUser = {
        email: 'test@email.com',
        password: 'Password123',
      };
      await User.create(existingUser);
      const userInfo = {
        email: 'test@email.com',
        password: 'anotherSecret',
      };
      const response = await request(app).post('/api/register').send(userInfo);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Account already exists with this email');
    });
  });
});
