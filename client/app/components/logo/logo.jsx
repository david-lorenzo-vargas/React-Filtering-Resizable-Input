import React from 'react';
import styles from './logo.scss';

const Logo = () => (
  <div className={styles['logo']}>
    <img className={styles['logo__img']} src="https://guitarcentre.net.au/content/themes/guitarcentre/images/guitarcentre-logo-white.png" alt="logo" />
  </div>
);

export default Logo;
