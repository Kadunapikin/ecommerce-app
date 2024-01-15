import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import react-toastify
import './login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Logging in with email:', email);
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });  
      const token = response.data.token;
      localStorage.setItem('token', token);
      toast.success('Login successful');
      navigate('/product');
    } catch (error) {
      // Handle login error and display a toast message
      console.error('Login error:', error);
      toast.error('Login failed. Please check your email and password.');
    }
  };

  return (
<div className="login-container">
  <h2>Login</h2>
  <form className="login-form">
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
  <p className="registration-link">
    Don't have an account? <Link to="/register">Register</Link>
  </p>
</div>
  );
};

export default Login;
