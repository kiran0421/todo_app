import { getDB } from "../DB/dbConnect.js";
export const checkUserExists = async (username) => {
  console.log(username);
  const db = await getDB();
  const [rows] = await db.query("SELECT id FROM userlogin WHERE username = ?", [
    username,
  ]);
  return rows.length > 0;
};

export const createUserLogin = async (username, phone, password) => {
  console.log(username, phone, password);
  const db = await getDB();
  const [result] = await db.query(
    "INSERT INTO userlogin (username, phone, password) VALUES (?, ?, ?)",
    [username, phone, password]
  );
  return result.insertId;
};

export const createUserDetails = async (
  userId,
  name,
  surname,
  email,
  dob,
  gender
) => {
  console.log(userId, name, surname, email, dob, gender);
  let genderValue = gender.toLowerCase();
  const db = await getDB();
  await db.query(
    "INSERT INTO userdetails (user_id, name, surname,email, dob, gender) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, name, surname, email, dob, genderValue]
  );
};
export const createUserLogs = async (userId, refresh_token, expires_at) => {
  const db = await getDB();
  await db.query(
    `INSERT INTO userlogs (user_id, refresh_token, expires_at)
     VALUES (?, ?, ?)`,
    [userId, refresh_token, expires_at]
  );
};

export const getUserDetails = async (userId) => {
  const db = await getDB();
  const [rows] = await db.query("SELECT * FROM userdetails WHERE user_id = ?", [
    userId,
  ]);
  if (rows.length === 0) return null;
  return rows[0];
};
