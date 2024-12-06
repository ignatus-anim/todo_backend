import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS with specific origin
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;