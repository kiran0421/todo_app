// src/auth.js
import axios from 'axios';
export const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

export const login = async (username) => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/login',
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
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data.user;
    }
  } catch (err) {
    alert('Login failed: ' + err.response?.data?.message || err.message);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const register = async (userData) => {
  try {
    console.log('Registering user:', userData);
    const res = await axios.post(
      'http://localhost:3000/api/auth/register',
      userData
    );
    if (res.status === 201) {
      alert('Registration successful');
      return res.data;
    }
  } catch (err) {
    alert('Registration failed: ' + err.response?.data?.message || err.message);
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const forgotpassword = async (username, dob) => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/forgotPassword',
      { username, dob }
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    alert('Error:' + err.response?.data?.message || err.message);
  }
};
export const resetPassword = async (email) => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/resetPassword',
      { username, password }
    );
    if (res.status === 200) {
      alert('Password reset link sent to your email');
      return res.data;
    }
  } catch (err) {
    alert('Error:' + err.response?.data?.message || err.message);
  }
};
