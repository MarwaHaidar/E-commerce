import React from 'react';
import styles from './ourStoryImage.module.css';

const OurStory = () => {
  return (
    <div>
      <span className={styles.story}>Our Story</span>
      <pre className={styles.storypara}> 
        {`
        our platform, InStyle, stands as the leading online destination
        for fashion enthusiasts in the region, specializing in clothing 
        and accessories.
        With a dedicated focus on fast delivery, stringent security measures,
        and a secure online payment gateway.
        InStyle guarantees a seamless shopping experience for 
        our valued customers.
        `}
      </pre>
    </div>
  );
};

export default OurStory;
