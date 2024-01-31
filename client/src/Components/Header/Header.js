import React from 'react'
import styles from './Header.module.css';
import Banner from './Banner';
import Logo from './Logo';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const toggleSearchBar = () => {
    const searchBar = document.querySelector(`.${styles.searchBar}`);
    searchBar.classList.toggle(styles.visible);
  };
  const toggleNavBar = () => {
    const navBar = document.querySelector(`.${styles.navBar}`);
    navBar.classList.toggle(styles.extended);
  };
  return (
    <div>
      <Banner />
    <div className={styles.header}>
      <Logo /> 
      <NavBar />
      <GiHamburgerMenu className={styles.hamburger} onClick={toggleNavBar} />
      <div className={styles.iconContainer}>
      <SearchBar />

      <LuSearch className={styles.searchIconSmall} onClick={toggleSearchBar}/>
      <FiHeart className={styles.wishIcon} />
      <FiShoppingCart className={styles.shopCartIcon} />
      </div>
    </div>
    </div>
  )
}

export default Header
