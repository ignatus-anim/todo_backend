import request from 'supertest';
import express from 'express';
import todoRoutes from '../routes/todoRoutes.js';
import { TodoService } from '../services/todoService.js';

const app = express();
app.use(express.json());
app.use('/todos', todoRoutes);

jest.mock('../services/todoService.js');

describe('Todo API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /todos', () => {
    it('should return all todos', async () => {
      const mockTodos = [
        { id: 1, title: 'Test Todo', description: 'Test Description' }
      ];
      
      TodoService.getAllTodos.mockResolvedValue(mockTodos);

      const response = await request(app).get('/todos');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTodos);
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const newTodo = { title: 'New Todo', description: 'New Description' };
      const mockCreatedTodo = { id: 1, ...newTodo };
      
      TodoService.createTodo.mockResolvedValue(mockCreatedTodo);

      const response = await request(app)
        .post('/todos')
        .send(newTodo);
      
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreatedTodo);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/todos')
        .send({ description: 'Missing Title' });
      
      expect(response.status).toBe(400);
    });
  });
});