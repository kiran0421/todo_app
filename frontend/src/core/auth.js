// src/auth.js
import axios from "axios";
export const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

export const login = async (username) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true, // if you use cookies for auth
      }
    );

    if (res.status === 200) {
      // store auth state (token, flag, etc.)
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    }
  } catch (err) {
    alert("Login failed: " + err.response?.data?.message || err.message);
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};
