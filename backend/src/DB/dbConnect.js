import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'todo_db',
  port: process.env.DB_PORT || 3306,
});
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

export default db;
