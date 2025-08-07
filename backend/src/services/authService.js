import {
  createUserLogin,
  createUserDetails,
  checkUserExists,
  ensureTablesExist,
  getUserDetails,
} from '../repositories/authRepository.js';
import bcrypt from 'bcrypt';

export const registerUserService = async (data) => {
  const { username, phone, password, name, surname, dob } = data;

  await ensureTablesExist();

  const exists = await checkUserExists(username);
  if (exists) throw new Error('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await createUserLogin(username, phone, hashedPassword);
  await createUserDetails(userId, name, surname, dob);
  await createUserLogs(userId, '', null); // Initialize logs with empty token and no expiration
  return userId;
};
export const loginUserService = async (userId) => {
  const userDetails = await getUserDetails(userId);
  if (!userDetails) throw new Error('User not found');
  return {
    id: userDetails.id,
    username: userDetails.username,
    name: userDetails.name,
    surname: userDetails.surname,
    dob: userDetails.dob,
  };
};

export const logoutUserService = async (userId) => {
  // Logic for user logout, e.g., invalidate session or token
  return { message: 'User logged out successfully' };
};
