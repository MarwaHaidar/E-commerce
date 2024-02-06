import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Banner from './Banner';
import Logo from './Logo';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import { FiHeart, FiShoppingCart } from "react-icons/fi";


const Header = () => {
  return (
    <div>
      <Banner />
      <div className={styles.header}>
        <Logo />
        <NavBar />
        <div className={styles.iconContainer}>
          <SearchBar />
          <Link to="/wishlist" className={styles.link}>
            <FiHeart className={styles.wishIcon} />
          </Link>
          <Link to="/cart" className={styles.link}>
          <FiShoppingCart className={styles.shopCartIcon} />
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Header;

