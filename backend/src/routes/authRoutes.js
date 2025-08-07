import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';
const todoRoute = express.Router();

// Sample route for getting all todos
todoRoute.post('/login', loginUser);

// Sample route for creating a new todo
todoRoute.post('/logout', logoutUser);

// Sample route for creating a new todo
todoRoute.post('/register', registerUser);

// Export the router
export default todoRoute;
