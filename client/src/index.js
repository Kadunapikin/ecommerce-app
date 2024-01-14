import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './context/cartContext';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

ReactDOM.render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
    <ToastContainer /> {/* Add ToastContainer */}
  </BrowserRouter>,
  document.getElementById('root')
);
