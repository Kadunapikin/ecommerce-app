import React from 'react';
import classes from './cart.module.css';
import { useCartContext } from '../../context/cartContext';
import {AiOutlineClose, AiOutlineShoppingCart} from 'react-icons/ai';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import LogoutButton from '../logoutButton/LogoutButton';

const Cart = () => {
  const {products, isOpen, toggleCart, removeProduct} = useCartContext();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  const handleCheckout = async () => {
    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem('token');
  
      const lineItems = products.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      });
      const { data } = await axios.post(
        'http://localhost:5000/checkout',
        { lineItems },
        {
          headers: {
            // Include the JWT token in the Authorization header
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      const stripe = await stripePromise;
  
      const result = await stripe.redirectToCheckout({ sessionId: data.id });
  
      if (result.error) {
        console.error(result.error.message); // Log the error
      }
    } catch (error) {
      console.error(error);
    }
  };
    
  // const handleCheckout = async () => {
  //   const lineItems = products.map((item) => {
  //     return {
  //       price_data: {
  //         currency: 'usd',
  //         product_data: {
  //           name: item.name
  //         },
  //         unit_amount: item.price * 100
  //       },
  //       quantity: item.quantity
  //     }
  //   })
  //   const {data} = await axios.post('http://localhost:5000/checkout', {lineItems})
    
  //   const stripe = await stripePromise

  //   await stripe.redirectToCheckout({sessionId: data.id})
  // }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.logoutbtn}>{<LogoutButton />}</div>
        <div className={classes.cartIcon}>
          <AiOutlineShoppingCart size={25} onClick={toggleCart} />
          <span className={classes.cartNumber}>
            {products?.length}
          </span>
          {isOpen && (
            <div className={classes.cartContainer}>
              {products?.length > 0 ? (
                <>
                <h4>Products</h4>
                <div className={classes.productContainer}>
                  {products.map((product) => (
                    <div className={classes.product} key={product.id}>
                      <img src={product.img} alt="" />
                      <div className={classes.productDetails}>
                        <h3>{product.name}</h3>
                        <span>{product.quantity} x ${product.price}</span>
                      </div>
                      <AiOutlineClose onClick={() => removeProduct(product)} />
                    </div>
                  ))}
                </div>
                <div className={classes.controls}>
                  <button onClick={handleCheckout}>Checkout</button>
                  <span onClick={toggleCart}>Close Cart</span>
                </div>
                </>
              ) : (<h3>No Product in Cart</h3>)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart