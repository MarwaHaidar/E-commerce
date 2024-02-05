// import React from 'react';
// import styles from './ourStoryImage.module.css'
// import zara1 from '../Assets/girlwithbags.jpg'

// const OurStoryImage = () => {
//   return (

//     <div className={styles.container}>
//     <img src={zara1} alt="Your Image" className={styles.image}/>
//     </div>
//   );
// };

// export default OurStoryImage;

import React from 'react';
import styles from './ourStoryImage.module.css';
import Swiper from './swiperImage'
//import FilterableBox from './FilterableMenu';




const Slider = () => {
  return (
    <div>
      <div className={styles.container1}>
        
        <div className={styles.slider}>
          <Swiper />
        </div>
      </div>

    </div>
  )
}

export default Slider

