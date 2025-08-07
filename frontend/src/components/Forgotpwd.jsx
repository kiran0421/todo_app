import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { forgotpassword } from '../core/auth';

const Forgotpwd = () => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = '/login';

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password');
      return;
    } else {
      forgotpassword(username, dob);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              placeholder="Enter Date of Birth"
              value={dob}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Validate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpwd;
