import React from 'react';
import Styles from './banner.module.css';
import banner from '../../Assets/zara15.png'; // Ensure correct path to your image

const Banner = () => {
  return (
    <div>
      <div className={Styles.baner}>
      <div className={Styles.banimg}>
          <img  src={banner} alt="Banner" />
        </div>
        <div className={Styles.bantxt}>
          <p className={Styles.banpar}>ENHANCE YOUR STYLE</p>
        </div>
        <div className={Styles.banimg}>
          <img  src={banner} alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
