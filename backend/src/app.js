import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Todo API');
});
const PORT = process.env.PORT || 5000;
import db from './DB/dbConnect.js';

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
