import React from 'react'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/LogoInStyle.jpeg';

const Logo = () => {
    return (
        <div>
            <Link to="/" className={styles.logo} ><img src={logo} alt="Logo" /></Link>
        </div>
    )
}

export default Logo