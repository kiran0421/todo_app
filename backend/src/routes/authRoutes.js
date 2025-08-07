import express from "express";
import { getAllTodos } from "../controllers/todoController.js";
import { createTodo } from "../controllers/todoController.js";
import { logout } from "../../../frontend/src/core/auth.js";
const todoRoute = express.Router();

// Sample route for getting all todos
todoRoute.get("/login", loginUser);

// Sample route for creating a new todo
todoRoute.post("/logout", logoutUser);

// Sample route for creating a new todo
todoRoute.post("/register", createUser);

// Export the router
export default todoRoute;
