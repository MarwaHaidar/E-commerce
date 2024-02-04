import React from 'react';
import styles from './crewImageCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CrewImageCard = ({ image, name, position }) => {
  return (
    
    <div className={styles.crewcontainer}>
      <div className={styles.card}>
        <div className={styles.image}>
          <img className={styles.cardImg} src={image} alt="Your Image" />
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.data}>
          <span className={styles.name}>{name}</span>
          <span className={styles.position}>{position}</span>
        
      </div>
    </div>
    </div>
  );
}


export default CrewImageCard;