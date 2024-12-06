import request from 'supertest';
import express from 'express';
import todoRoutes from '../routes/todoRoutes.js';

const app = express();
app.use(express.json());
app.use('/todos', todoRoutes);

import { jest } from '@jest/globals';

// Mock services
jest.unstable_mockModule('../services/todoService.js', () => ({
  getAllTodos: jest.fn(),
  createTodo: jest.fn(),
}));

describe('Todo API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /todos", () => {
    it("should return all todos", async () => {
      const mockTodos = [
        {
          id: 22,
          title: "Gen Election",
          description: "vote tomorrow",
          priority: "high",
          category: "personal",
          completed: null,
          created_at: "2024-12-06T22:49:03.997Z",
          updated_at: "2024-12-06T22:49:03.997Z",
          duedate: null,
        },
        {
          id: 4,
          title: "testing",
          description: "testing data posting",
          priority: "low",
          category: null,
          completed: false,
          created_at: "2024-12-03T16:26:01.061Z",
          updated_at: "2024-12-03T17:12:51.516Z",
          duedate: null,
        },
      ];
  
      const { getAllTodos } = await import("../services/todoService.js");
      getAllTodos.mockResolvedValue(mockTodos);
  
      const response = await request(app).get("/todos");
  
      expect(response.status).toBe(200);
  
      // Assert critical fields and structure
      response.body.forEach((todo) => {
        expect(todo).toHaveProperty("id");
        expect(todo).toHaveProperty("title");
        expect(todo).toHaveProperty("description");
        expect(todo).toHaveProperty("priority");
        expect(todo).toHaveProperty("category");
      });
    });
  });
  

  describe('POST /todos', () => {
    it('should create a new todo with default priority', async () => {
      const newTodo = {
        title: 'Gen Election',
        description: 'vote tomorrow',
        category: 'personal',
        duedate: '2024-12-06T00:00:00.000Z',
      };

      const mockCreatedTodo = {
        id: 2,
        ...newTodo,
        priority: 'low',
        completed: false,
        created_at: '2024-12-06T23:25:30.921Z',
        updated_at: '2024-12-06T23:25:30.921Z',
      };

      const { createTodo } = await import('../services/todoService.js');
      createTodo.mockResolvedValue(mockCreatedTodo);

      const response = await request(app).post('/todos').send(newTodo);

      expect(response.status).toBe(201);

      // Validate essential fields
      expect(response.body.title).toBe(mockCreatedTodo.title);
      expect(response.body.priority).toBe('low');
      expect(response.body.category).toBe(newTodo.category);
    });

    it('should validate required fields', async () => {
      const response = await request(app).post('/todos').send({ description: 'Missing Title' });

      expect(response.status).toBe(400);

      // Check for validation error structure
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].msg).toBe('Title is required');
    });
  });
});
