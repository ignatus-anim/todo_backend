import pool from "../config/database.js";

export const TodoService = {
  async createTodo(
    title,
    description,
    priority = "low",
    dueDate,
    completed = false,
    category,
  ) {
    try {
      const query =
        "INSERT INTO todos (title, description, priority, dueDate, completed, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const { rows } = await pool.query(query, [
        title,
        description,
        priority,
        dueDate,
        completed,
        category,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  },

  async getAllTodos(
    page = 1,
    limit = 10,
    sortBy = "created_at",
    sortOrder = "DESC",
  ) {
    try {
      const offset = (page - 1) * limit;

      // Sanitize inputs
      const validColumns = ["created_at", "title", "id", "updated_at"];
      const validSortOrders = ["ASC", "DESC"];
      const sanitizedSortBy = validColumns.includes(sortBy)
        ? sortBy
        : "created_at";
      const sanitizedSortOrder = validSortOrders.includes(
        sortOrder.toUpperCase(),
      )
        ? sortOrder
        : "DESC";

      // SQL query
      const query = `
            SELECT * FROM todos 
            ORDER BY ${sanitizedSortBy} ${sanitizedSortOrder}
            LIMIT $1 OFFSET $2
        `;
      const { rows } = await pool.query(query, [limit, offset]);
      return rows;
    } catch (error) {
      console.error("Error getting todos:", error);
      throw error;
    }
  },

  async getTodoById(id) {
    try {
      const query = "SELECT * FROM todos WHERE id = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error getting todo by id:", error);
      throw error;
    }
  },

  async updateTodo(id, title, description) {
    try {
      const query = `
        UPDATE todos 
        SET title = $2, description = $3, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1 
        RETURNING *
      `;
      const { rows } = await pool.query(query, [id, title, description]);
      return rows[0];
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  },

  async deleteTodo(id) {
    try {
      const query = "DELETE FROM todos WHERE id = $1 RETURNING *";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  },

  async searchTodos(searchTerm) {
    try {
      const query = `
        SELECT * FROM todos 
        WHERE title ILIKE $1 OR description ILIKE $1
        ORDER BY created_at DESC
      `;
      const { rows } = await pool.query(query, [`%${searchTerm}%`]);
      return rows;
    } catch (error) {
      console.error("Error searching todos:", error);
      throw error;
    }
  },
};
