import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { toast } from 'react-toastify'; // Import react-toastify
import './register.css'; 


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create a navigate function for navigation
  

  const handleRegister = async () => {
    try {
      // Validate input fields
      if (!username || !email || !password) {
        toast.error('Please fill in all fields.');
        return;
      }
  
      // Validate email format
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailPattern.test(email)) {
        toast.error('Invalid email format. Please enter a valid email.');
        return;
      }
  
      // Validate password length
      if (password.length < 4) {
        toast.error('Password must be at least 4 characters long.');
        return;
      }
  
      // Make a POST request to your backend for registration
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
      });
  
      // Assuming your backend sends a token on successful registration
      const token = response.data.token;
  
      // Store the token in localStorage or a state management library (e.g., Redux)
      localStorage.setItem('token', token);
      toast.success('Registration successful');
  
      // Redirect to the success page or any desired page after successful registration
      navigate('/product');
    } catch (error) {
      // Handle registration error (e.g., show an error message to the user)
      console.error(error);
      toast.error('Registration failed. Please try again.');
    }
  };
  
  return (
<div className="register-container">
      <h2>Register</h2>
      <form className="register-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
export default Register;
