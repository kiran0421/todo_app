import { getDB } from "../DB/dbConnect.js";
var db = getDB();
export const findUserByUsername = async (username) => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM userlogin WHERE username = ?", [username]);
  return rows[0];
};

export const logRefreshToken = async (userId, refreshToken, ip) => {
  await db.promise().query(
    `INSERT INTO userlogs (user_id, refresh_token, ip_address, expires_at)
     VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
    [userId, refreshToken, ip]
  );
};
export const revokeRefreshToken = async (refreshToken) => {
  await db
    .promise()
    .query(`UPDATE userlogs SET is_revoked = TRUE WHERE refresh_token = ?`, [
      refreshToken,
    ]);
};

export const getUserByRefreshToken = async (refreshToken) => {
  const [rows] = await db
    .promise()
    .query(
      `SELECT * FROM userlogs WHERE refresh_token = ? AND is_revoked = FALSE AND expires_at > NOW()`,
      [refreshToken]
    );
  return rows[0];
};
