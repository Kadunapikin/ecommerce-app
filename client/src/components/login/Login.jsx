// Login.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import Link and useHistory
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Create a history object for navigation

  const handleLogin = async () => {
    try {
      // Make a POST request to your backend for login
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      // Assuming your backend sends a token on successful login
      const token = response.data.token;

      // Store the token in localStorage or a state management library (e.g., Redux)
      localStorage.setItem('token', token);

      // Redirect to the success page or any desired page after successful login
      history.push('/success');
    } catch (error) {
      // Handle login error (e.g., show an error message to the user)
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
