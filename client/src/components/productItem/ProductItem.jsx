import React from 'react';
import classes from './productItem.module.css';

const Products = () => {
  return (
    <div className={classes.container}>
        {products.map((product) => {
            <div key={product.id}>

            </div>
        })}
    </div>
  )
}

export default Products