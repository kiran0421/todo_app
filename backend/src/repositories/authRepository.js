import db from '../DB/dbConnect.js';

export const ensureTablesExist = async () => {
  await db.promise().query(`
    CREATE TABLE IF NOT EXISTS userlogin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      phone VARCHAR(15),
      password VARCHAR(255)
    )
  `);

  await db.promise().query(`
    CREATE TABLE IF NOT EXISTS userdetails (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      name VARCHAR(255),
      surname VARCHAR(255),
      dob DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES userlogin(id)
    )
  `);
  await db.promise().query(`
    CREATE TABLE IF NOT EXISTS userlogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      refresh_token TEXT NOT NULL,
      login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME,
      is_revoked BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES userlogin(id)
    )
  `);
};

export const checkUserExists = async (username) => {
  const [rows] = await db
    .promise()
    .query('SELECT id FROM userlogin WHERE username = ?', [username]);
  return rows.length > 0;
};

export const createUserLogin = async (username, phone, password) => {
  const [result] = await db
    .promise()
    .query(
      'INSERT INTO userlogin (username, phone, password) VALUES (?, ?, ?)',
      [username, phone, password]
    );
  return result.insertId;
};

export const createUserDetails = async (userId, name, surname, dob) => {
  await db
    .promise()
    .query(
      'INSERT INTO userdetails (user_id, name, surname, dob) VALUES (?, ?, ?, ?)',
      [userId, name, surname, dob]
    );
};
export const createUserLogs = async (userId, refresh_token, expires_at) => {
  await db.promise().query(
    `INSERT INTO userlogs (user_id, refresh_token, expires_at)
     VALUES (?, ?, ?, ?)`,
    [userId, refresh_token, expires_at]
  );
};

export const getUserDetails = async (userId) => {
  const [rows] = await db
    .promise()
    .query('SELECT * FROM userdetails WHERE user_id = ?', [userId]);
  if (rows.length === 0) return null;
  return rows[0];
};
