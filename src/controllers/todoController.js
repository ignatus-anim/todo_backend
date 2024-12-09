import { TodoService } from "../services/todoService.js";
import { validationResult } from "express-validator";

export const TodoController = {
  async createTodo(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, priority, dueDate, completed, category } =
        req.body;
      const todo = await TodoService.createTodo(
        title,
        description,
        priority,
        dueDate,
        completed,
        category,
      );
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllTodos(req, res) {
    try {
      // Sanitize and default query parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || "created_at";
      const sortOrder = req.query.sortOrder || "DESC";

      // Call service with sanitized inputs
      const todos = await TodoService.getAllTodos(
        page,
        limit,
        sortBy,
        sortOrder,
      );

      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getTodoById(req, res) {
    try {
      const todo = await TodoService.getTodoById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateTodo(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description } = req.body;
      const todo = await TodoService.updateTodo(
        req.params.id,
        title,
        description,
      );
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteTodo(req, res) {
    try {
      const todo = await TodoService.deleteTodo(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json({ message: "Todo deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async searchTodos(req, res) {
    try {
      const { query } = req.query;
      const todos = await TodoService.searchTodos(query);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
