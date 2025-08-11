import {
  createUserLogin,
  createUserDetails,
  checkUserExists,
  getUserDetails,
  createUserLogs,
} from "../repositories/authRepository.js";
import bcrypt from "bcrypt";

export const registerUserService = async (data) => {
  const { username, phone, password, name, surname, email, dob, gender } = data;
  console.log("Registering user with data:", data);
  const exists = await checkUserExists(username);
  if (exists) throw new Error("Username already exists");
  console.log(exists);
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await createUserLogin(username, phone, hashedPassword);
  console.log("User created with ID:", userId);
  await createUserDetails(userId, name, surname, email, dob, gender);
  console.log("User details created for user ID:", userId);
  // Initialize logs with empty token and no expiration
  await createUserLogs(userId, "", null);

  return userId;
};
export const loginUserService = async (userId) => {
  const userDetails = await getUserDetails(userId);
  if (!userDetails) throw new Error("User not found");
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
  return { message: "User logged out successfully" };
};
