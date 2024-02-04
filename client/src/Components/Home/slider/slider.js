import React from 'react';
import styles from './slider.module.css';
import Swiper from './Swiper'
import FilterableBox from './FilterableMenu';




const Slider = () => {
  return (
    <div>
      <div className={styles.container1}>
        <FilterableBox />
        <div className={styles.slider}>
          <Swiper />
        </div>
      </div>

    </div>
  )
}

export default Slider

