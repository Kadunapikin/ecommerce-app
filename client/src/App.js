import React, { useState, useEffect } from 'react';
import './App.css';
import Cart from './components/cart/Cart';
import ProductItem from './components/productItem/ProductItem';
import Success from './components/success/Success';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []); // Check authentication status on component mount

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>Welcome to Our E-Commerce Store!</h2>
              <p>
                To view and add products to your cart, please{' '}
                {isAuthenticated ? (
                  <Link to="/product">proceed to products</Link>
                ) : (
                  <>
                    <Link to="/login">Login</Link> or{' '}
                    <Link to="/register">Register</Link> first.
                  </>
                )}
              </p>
            </div>
          }
        />
        <Route
          path="/product"
          element={
            isAuthenticated ? (
              <>
                <Cart />
                <ProductItem />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
