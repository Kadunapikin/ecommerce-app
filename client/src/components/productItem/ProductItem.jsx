import React from 'react';
import classes from './productItem.module.css';
import { products } from '../../data/data';
import { useCartContext } from '../../context/cartContext';

const Products = () => {
    const {addProduct} = useCartContext

  return (
    <div className={classes.container}>
        {products.map((product) => {
            <div key={product.id} className={classes.product}>
                <img src={product.img} alt="" />
                <div className={classes.productDetails}>
                    <h3>{product.name}</h3>
                    <span>${product.price}</span>
                </div>
                <button onClick={() => addProduct(product)}>Add to Cart</button>
            </div>
        })}
    </div>
  )
}

export default Products