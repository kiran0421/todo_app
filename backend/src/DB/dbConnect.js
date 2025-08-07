import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;

const connect = async () => {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "todo_db",
      port: process.env.DB_PORT || 3306,
    });

    console.log("Connected to MySQL database");

    return db;
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    throw err;
  }
};

export default { connect, getConnection: () => db };
