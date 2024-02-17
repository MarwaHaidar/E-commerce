import React, { useState, useEffect } from 'react';
import styles from './AdminHeader.module.css';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies library
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

    const navigate = useNavigate(); // Initialize useNavigate
    const handleLogout = () => {
        // Clear the access token and refresh token cookies
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('user_id');
        Cookies.remove('first_name');
        Cookies.remove('role');

        // Redirect to the home page
        navigate('/login');
    };

    return (
        <>
            <nav className={`bg-white-800 p-4 nav-bar ${isNavBarExtended ? styles.extended : styles.navBar}`}>
                <div className="container mx-auto">
                    <ul className="flex space-x-4">
                        <Link to="/admin" className={`${styles.item} ${activePath === "/admin" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Dashborad</li></Link>
                        <Link to="/adminCharts" className={`${styles.item} ${activePath === "/adminCharts" ? styles.activeTab : ""}`} onClick={() => { closeNavBar(); }}><li>Charts</li></Link>
                        <li className= {styles.item} onClick={() => { handleLogout(); }}>Logout</li>
                    </ul>
                </div>
            </nav>
            <GiHamburgerMenu className={styles.hamburger} onClick={toggleNavBar} />
        </>
    );
}

export default NavBarAdmin;
