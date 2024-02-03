import React from 'react'
import styles from './properties.module.css'
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiCardExchange } from "react-icons/gi";
const properties = () => {
  return (
    <div>
        <div className={styles.mainctr}>
            <div className={styles.box1}>
            <div className={styles.grey}>
                <div className={styles.green}>
                <div className={styles.icon}><TbTruckDelivery /></div>
                </div>
                
            </div>
            <div className={styles.caption}>
                <p className={styles.para}>FREE AND FAST DELIVERY</p>
                <p className={styles.para2}>Free delivery for all orders over $140</p>
                </div>
                </div>
                <div className={styles.box1}>
            <div className={styles.grey}>
                <div className={styles.green}>
                <div className={styles.icon}><RiCustomerService2Fill /></div>
                </div>
                
            </div>
            <div className={styles.caption}>
                <p className={styles.para}>24/7 CUSTOMER SERVICE</p>
                <p className={styles.para2}>Friendly 24/7 customer support</p>
                </div>
                </div>

           <div className={styles.box1}>
            <div className={styles.grey}>
                <div className={styles.green}>
                <div className={styles.icon}><GiCardExchange /></div>
                </div>
                
            </div>
            <div className={styles.caption}>
                <p className={styles.para}>EXCHANGE  PRODUCTS</p>
                <p className={styles.para2}>We exchange product within 10 days</p>
                </div>
                </div>


        </div>
      
    </div>
  )
}

export default properties
