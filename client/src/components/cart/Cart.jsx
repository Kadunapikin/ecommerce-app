import React from 'react';
import classes from './cart.module.css';
import { useCartContext } from '../../context/cartContext';
import {AiOutlineShoppingCart} from 'react-icons/ai';

const Cart = () => {
  const {products, isOpen, toggleCart, removeProduct} = useCartContext();

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.cartIcon} onClick={toggleCart}>
          <AiOutlineShoppingCart size={25} />
          <span className={classes.cartNumber}>
            {products?.length}
          </span>
        </div>
      </div>
      Cart
    </div>
  )
}

export default Cart