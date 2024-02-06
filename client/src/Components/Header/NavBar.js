import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
    const location = useLocation();
    const activePath = location.pathname;

    const [isNavBarExtended, setNavBarExtended] = useState(false);

    const toggleNavBar = () => {
        setNavBarExtended(!isNavBarExtended);
    };

    const closeNavBar = () => {
        setNavBarExtended(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 791) {
                setNavBarExtended(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <nav className={`bg-white-800 p-4 nav-bar ${isNavBarExtended ? styles.extended : styles.navBar}`}>
                <div className="container mx-auto">
                    <ul className="flex space-x-4">
                        <Link to="/" className={`${styles.item} ${activePath === "/" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Home</li></Link>
                        <Link to="/about" className={`${styles.item} ${activePath === "/about" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>About</li></Link>
                        <Link to="/contact" className={`${styles.item} ${activePath === "/contact" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Contact</li></Link>
                        <Link to="/register" className={`${styles.item} ${activePath === "/register" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Signup</li></Link>
                    </ul>
                </div>
            </nav>
            <GiHamburgerMenu className={styles.hamburger} onClick={toggleNavBar} />
        </>
    );
}

export default NavBar;
