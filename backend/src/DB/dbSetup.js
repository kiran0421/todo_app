import { getDB } from "./dbConnect.js";

export const ensureTablesExist = async () => {
  const db = await getDB();

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS userlogin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(15),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS userdetails (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255),
        surname VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        dob DATE,
        gender ENUM('male', 'female', 'other'),
        FOREIGN KEY (user_id) REFERENCES userlogin(id) ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS userlogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        refresh_token TEXT NOT NULL,
        expires_at TEXT,
        login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES userlogin(id) ON DELETE CASCADE
      )
    `);

    console.log("All tables ensured to exist");
  } catch (err) {
    console.error("Error ensuring tables:", err);
    throw err;
  }
};
