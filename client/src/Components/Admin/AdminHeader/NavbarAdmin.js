import React, { useState, useEffect } from 'react';
import styles from './AdminHeader.module.css';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const NavBarAdmin = () => {
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
                        <Link to="/admin" className={`${styles.item} ${activePath === "/admin" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Dashborad</li></Link>
                        <Link to="/adminCharts" className={`${styles.item} ${activePath === "/adminCharts" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Charts</li></Link>
                        <Link to="/admin/queries" className={`${styles.item} ${activePath === "/admin/queries" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Customer Queries</li></Link>
                    </ul>
                </div>
            </nav>
            <GiHamburgerMenu className={styles.hamburger} onClick={toggleNavBar} />
        </>
    );
}

export default NavBarAdmin;
