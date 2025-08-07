import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../core/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
      return;
    } else {
      login(username, password);
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Login</h2>
      <fieldset>
        <field>
          <label>Full name</label>
          <input
            name="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </field>
        <field>
          <label>Password</label>
          <input
            name="password"
            type="text"
            placeholder="Enter username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </field>
      </fieldset>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
