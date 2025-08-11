import mysql from "mysql2/promise";

let pool;

export const initDB = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "myapp",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test a connection
    await pool.query("SELECT 1");
    console.log("MySQL pool created and tested successfully");
  } catch (error) {
    console.error("Error initializing DB:", error);
    process.exit(1);
  }
};

// Always return a working DB connection
export const getDB = async () => {
  if (!pool) {
    console.warn("Pool was not initialized — reinitializing...");
    await initDB();
  }

  try {
    await pool.query("SELECT 1"); // test connection
  } catch (err) {
    console.warn("MySQL connection lost — reconnecting...");
    await initDB();
  }

  return pool;
};
