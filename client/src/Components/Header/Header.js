import React from 'react';
import styles from './Header.module.css';
import Banner from './Banner';
import Logo from './Logo';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";


const Header = () => {
  return (
    <div>
      <Banner />
      <div className={styles.header}>
        <Logo />
        <NavBar />
        <div className={styles.iconContainer}>
          <SearchBar />
          <FiHeart className={styles.wishIcon} />
          <FiShoppingCart className={styles.shopCartIcon} />
        </div>
      </div>
    </div>
  )
}

export default Header
