import React from 'react';
import classes from './success.module.css';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className={classes.success}>
      <h2>Order Placed Successfully!</h2>
      <p>Your purchase was successful, and your items will be delivered to the designated address you provided.</p>
      <p>If you wish to shop with us again, you can return to the <Link to="/product">product page</Link>.</p>
      <p>Or, you can <Link to="/logout">logout</Link> if you are done shopping.</p>
    </div>
  )
}

export default Success;
