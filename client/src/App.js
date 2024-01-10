import './App.css';
import Cart from './components/cart/Cart';
import ProductItem from './components/productItem/ProductItem';
import Success from './components/success/Success';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <>
          <Cart />
          <ProductItem />
          </>
        }  />
        <Route path='/success' element={<Success />}  />
      </Routes>
    </div>
  );
}

export default App;
