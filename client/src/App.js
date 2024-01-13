// App.js
import './App.css';
import Cart from './components/cart/Cart';
import ProductItem from './components/productItem/ProductItem';
import Success from './components/success/Success';
import { Routes, Route } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <>
            <Cart />
            <ProductItem />
          </>
        } />
        <Route path='/success' element={<Success />} />
        <Route path='/login' element={<Login />} /> {/* Add Login route */}
        <Route path='/register' element={<Register />} /> {/* Add Register route */}
      </Routes>
    </div>
  );
}

export default App;
