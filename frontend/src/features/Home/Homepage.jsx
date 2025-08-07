import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../core/auth";

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    } else {
      const redirectTo = location.pathname || "/";
      navigate(`/login?redirect=${redirectTo}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to the Todo App</h1>
      <p>Manage your tasks efficiently!</p>
      <button onClick={handleClick}>Get Started</button>
    </div>
  );
};

export default Homepage;
