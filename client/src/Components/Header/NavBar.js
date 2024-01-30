import React from 'react'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className={`"bg-white-800 p-4 nav-bar" ${styles.navBar}`}>
            <div className={"container mx-auto"}>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-black">Home</Link></li>
                    <li><Link to="/about" className="text-black">About</Link></li>
                    <li><Link to="/contact" className="text-black">Contact</Link></li>
                    <li><Link to="/login" className="text-black">Login</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar