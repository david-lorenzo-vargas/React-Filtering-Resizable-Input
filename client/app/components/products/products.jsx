import React from 'react';
import styles from './products.scss';

const Products = (props) => {
  const { product } = props;

  return (
    <div className={styles['product']}>
      {product.map((item, index) => (
        <div className={styles['product__item']} key={index}>
          <div className={styles['product__container']}>
            <div className={styles['product__container--name']}>
              <span className={styles['product__name']}>{item.guitar}</span>
            </div>
          </div>
          <img className={styles['product__image']} src={item.image} alt="guitar" />
          <div className={styles['product__container--price']}>
            <span className={styles['product__price']}>€{item.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
