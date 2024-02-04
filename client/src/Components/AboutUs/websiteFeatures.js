import React from 'react';
import styles from './websiteFeatures.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WebsiteFeatures = ({ icon, feature, desc}) => {
  return (
    <div className={styles.card}>
      <div className={styles.circle}>
        <div className={styles.smallCircle}>
          <FontAwesomeIcon icon={icon} style={{ color: "#6B9499", fontSize: '30px' }} />
        </div>
      </div>
      <div><span style={{ color: 'black', fontSize: '40px'}}>{feature}</span></div>
      <div style={{ color: 'black' }}>{desc}</div>
    </div>
  );
};

export default WebsiteFeatures;