import React from 'react'
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const activePath = location.pathname
    return (
        <nav className={`"bg-white-800 p-4 nav-bar" ${styles.navBar}`}>
            <div className={"container mx-auto"}>
                <ul className="flex space-x-4">
                    <li><Link to="/" className={activePath === "/" ? styles.activeTab : ""}>Home</Link></li>
                    <li><Link to="/about" className={activePath === "/about" ? styles.activeTab : ""}>About</Link></li>
                    <li><Link to="/contact" className={activePath === "/contact" ? styles.activeTab : ""}>Contact</Link></li>
                    <li><Link to="/login" className={activePath === "/login" ? styles.activeTab : ""}>Login</Link></li>
                    <li><Link to="/signup" className={activePath === "/signup" ? styles.activeTab : ""}>signup</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar