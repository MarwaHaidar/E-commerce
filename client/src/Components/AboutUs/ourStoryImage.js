import React from 'react';
import styles from './ourStoryImage.module.css'
import zara1 from '../Assets/girlwithbags.jpg'

const OurStoryImage = () => {
  return (

    <div className={styles.container}>
    <img src={zara1} alt="Your Image" className={styles.image}/>
    </div>
  );
};

export default OurStoryImage;