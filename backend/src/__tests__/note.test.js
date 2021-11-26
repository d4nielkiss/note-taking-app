import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Note from '../models/Note';
import { connectToDb } from '../db';

beforeEach(async () => {
  await connectToDb();
});

afterEach(async () => {
  await Note.deleteMany();
  await mongoose.connection.close();
});

describe('POST api/note', () => {
  describe('given correct data to create note', () => {
    test('should respond with status code 204', async () => {
      const noteData = {
        title: 'The title',
        description: 'A short description.',
        date: Date.now(),
        isPinned: false,
        authorId: '6107a327b1c3c1003b3b126e',
      };
      const response = await request(app).post('/api/note').send(noteData);
      expect(response.statusCode).toBe(204);
    });
  });

  describe('given data but missing title', () => {
    test('should respond with status code 400 and error message', async () => {
      const noteData = {
        title: '',
        description: 'A short description.',
        date: Date.now(),
        isPinned: false,
        authorId: '6107a327b1c3c1003b3b126e',
      };
      const response = await request(app).post('/api/note').send(noteData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing title');
    });
  });

  describe('given data but missing description', () => {
    test('should respond with status code 400 and error message', async () => {
      const noteData = {
        title: 'The title',
        description: '',
        date: Date.now(),
        isPinned: false,
        authorId: '6107a327b1c3c1003b3b126e',
      };
      const response = await request(app).post('/api/note').send(noteData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing description');
    });
  });

  describe('given data but missing date', () => {
    test('should respond with status code 400 and error message', async () => {
      const noteData = {
        title: 'The title',
        description: 'A short description.',
        date: undefined,
        isPinned: false,
        authorId: '6107a327b1c3c1003b3b126e',
      };
      const response = await request(app).post('/api/note').send(noteData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing date');
    });
  });

  describe('given data but missing isPinned', () => {
    test('should respond with status code 400 and error message', async () => {
      const noteData = {
        title: 'The title',
        description: 'A short description.',
        date: Date.now(),
        isPinned: undefined,
        authorId: '6107a327b1c3c1003b3b126e',
      };
      const response = await request(app).post('/api/note').send(noteData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing isPinned');
    });
  });

  describe('given data but missing author ID', () => {
    test('should respond with status code 400 and error message', async () => {
      const noteData = {
        title: 'The title',
        description: 'A short description.',
        date: Date.now(),
        isPinned: false,
        authorId: undefined,
      };
      const response = await request(app).post('/api/note').send(noteData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing author ID');
    });
  });

  describe('given data but too long description', () => {
    test('should respond with status code 400 and error message', async () => {
      const noteData = {
        title: 'The title',
        description: 'Aenean lacinia vehicula ante, interdum sagittis nulla porttitor ut. Vivamus ut nisi ullamcorper, porta mi in, maximus nulla. Nam luctus aliquam est ac hendrerit. Nulla eleifend mauris sed nibh convallis efficitur. Aenean lacinia vehicula ante, interdum sagittis nulla porttitor ut. Vivamus ut nisi ullamcorper, porta mi in, maximus nulla. Nam luctus aliquam est ac hendrerit. Nulla eleifend mauris sed nibh convallis efficitur. Aenean lacinia vehicula ante, interdum sagittis nulla porttitor ut. Vivamus ut nisi ullamcorper, porta mi in, maximus nulla. Nam luctus aliquam est ac hendrerit. Nulla eleifend mauris sed nibh convallis efficitur. Aenean lacinia vehicula ante, interdum sagittis nulla porttitor ut. Vivamus ut nisi ullamcorper, porta mi in, maximus nulla. Nam luctus aliquam est ac hendrerit. Nulla eleifend mauris sed nibh convallis efficitur. Aenean lacinia vehicula ante, interdum sagittis nulla porttitor ut. Vivamus ut nisi ullamcorper, porta mi in, maximus nulla. Nam er, porta mi ina',
        date: Date.now(),
        isPinned: false,
        authorId: '6107a327b1c3c1003b3b126e',
      };
      const response = await request(app).post('/api/note').send(noteData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Description cannot be longer than 1000 characters');
    });
  });
})