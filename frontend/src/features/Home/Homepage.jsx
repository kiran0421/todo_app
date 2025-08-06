import React from 'react';
const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <p>Manage your tasks efficiently!</p>
      <button onClick={() => alert('Get Started!')}>Get Started</button>
    </div>
  );
};

export default Homepage;
