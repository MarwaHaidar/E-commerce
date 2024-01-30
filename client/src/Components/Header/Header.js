import React from 'react'
import styles from './Header.module.css';
import Banner from './Banner';
import Logo from './Logo';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <div>
      <Banner />
    <div className={styles.header}>
      <Logo /> 
      <NavBar />
      <SearchBar />
    </div>
    </div>
  )
}

export default Header
