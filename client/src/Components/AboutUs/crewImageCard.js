import React from 'react';
import styles from './crewImageCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CrewImageCard = ({ image, name, position }) => {
  return (
    <div>
    <div className={styles.card}>
    <img className={styles.cardImg} src={image} alt="Your Image" />
    </div>
    <span style={{marginLeft:'24%'}}>{name}</span>
    <div style={{marginLeft:'24%'}}>{position}</div>
    </div>
    
  );
};

export default CrewImageCard;