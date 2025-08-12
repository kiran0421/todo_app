import { getDB } from "../DB/dbConnect.js";
export const findUserByUsername = async (username) => {
  const db = await getDB();
  console.log("Finding user by username:", username);
  const [rows] = await db.query("SELECT * FROM userlogin WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

export const logRefreshToken = async (userId, refreshToken) => {
  const db = await getDB();
  await db.query(
    `INSERT INTO userlogs (user_id, refresh_token, expires_at)
     VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
    [userId, refreshToken]
  );
};
export const revokeRefreshToken = async (refreshToken) => {
  const db = await getDB();
  await db.query(
    `UPDATE userlogs SET is_revoked = TRUE WHERE refresh_token = ?`,
    [refreshToken]
  );
};

export const getUserByRefreshToken = async (refreshToken) => {
  const db = await getDB();
  const [rows] = await db.query(
    `SELECT * FROM userlogs WHERE refresh_token = ? AND is_revoked = FALSE AND expires_at > NOW()`,
    [refreshToken]
  );
  return rows[0];
};
