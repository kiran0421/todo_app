import express from 'express';
import { getAllTodos } from '../controllers/todoController.js';
import { createTodo } from '../controllers/todoController.js';
const todoRoute = express.Router();

// Sample route for getting all todos
todoRoute.get('/', getAllTodos);

// Sample route for creating a new todo
todoRoute.post('/add', createTodo);

// Export the router
export default todoRoute;
