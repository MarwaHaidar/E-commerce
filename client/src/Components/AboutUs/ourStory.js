import React from 'react';
import styles from './ourStoryImage.module.css';

const OurStory = () => {
  return (
    <div>
      <span className={styles.story}>Our Story</span>
      <pre className={styles.storypara}> 
        {`
        Launched in 2015, Exclusive is South Asia’s premier online shopping
        marketplace with an active presence in Bangladesh.
        Supported by a wide range of tailored marketing, data,
        and service solutions, Exclusive has 10,500 sellers 
        and 300 brands and serves 3 million customers across the region.

        Exclusive has more than 1 Million products to offer, growing at a very fast.
        Exclusive offers a diverse assotment in categories ranging  from consumer.
        `}
      </pre>
    </div>
  );
};

export default OurStory;
