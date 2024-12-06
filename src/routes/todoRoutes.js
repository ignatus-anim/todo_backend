import express from 'express';
import { body } from 'express-validator';
import { TodoController } from '../controllers/todoController.js';

const router = express.Router();

const todoValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().optional()
];

router.post('/', todoValidation, TodoController.createTodo);
router.get('/', TodoController.getAllTodos);
router.get('/search', TodoController.searchTodos);
router.get('/:id', TodoController.getTodoById);
router.put('/:id', todoValidation, TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

export default router;