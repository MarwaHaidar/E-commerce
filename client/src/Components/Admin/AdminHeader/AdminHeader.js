import React from 'react';
// Import Link from react-router-dom
import styles from './AdminHeader.module.css';
import Banner from '../../Header/Banner';
import Logo from '../../Header/Logo';
import NavBarAdmin from './NavbarAdmin';

function AdminHeader() {
    return (
        <div>
      
          <div className={styles.header}>
            <Logo/>
            <NavBarAdmin />
            </div>
          </div>
       
      )
    }

export default AdminHeader
