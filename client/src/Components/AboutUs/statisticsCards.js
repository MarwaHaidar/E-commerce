// import React from 'react';
// import styles from './statisticsCard.module.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faDollar} from '@fortawesome/free-solid-svg-icons';
// //import { faEye } from '@fortawesome/free-solid-svg-icons';

// library.add(faDollar);

// const StatisticsCard = () => {
//   return (
//     <div className={styles.card}>
//     <div className={styles.circle}>
//     <div className={styles.smallCircle}>
//     <FontAwesomeIcon icon="fa-solid fa-dollar-sign" style={{color: "#6B9499",fontSize:'50px'}} />
//     </div>
//     </div>
//     <div><span style={{color:'whitesmoke',fontSize:'40px'}}>33K</span></div>
//     <div style={{color:'whitesmoke'}}>Monthly Product Sale</div>
     
//     </div>
//   );
// };

// export default StatisticsCard;

import React from 'react';
import styles from './statisticsCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Bag from '../Assets/bag3.png'
import { CiDollar } from "react-icons/ci";
import { FaSackDollar } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { BiSolidShoppingBags } from "react-icons/bi";

const StatisticsCard = ({ icon, value, text }) => {
  return (
    // <div className={styles.card}>
    //   <div className={styles.circle}>
    //     <div className={styles.smallCircle}>
    //       <FontAwesomeIcon icon={icon} style={{ color: "#6B9499", fontSize: '30px' }} />
    //     </div>
    //   </div>
    //   <div><span style={{ color: 'whitesmoke', fontSize: '40px'}}>{value}</span></div>
    //   <div style={{ color: 'whitesmoke' }}>{text}</div>
    // </div>
    <div className={styles.stcontainer}>
      <div className={styles.stcard}>
        <div className={styles.stimg}><img className={styles.bagimg} src={Bag}/>
        <div className={styles.sticon}><IoStorefrontOutline /></div>
        <p className={styles.nb}>33K</p></div>
        <div className={styles.st_text}>
          <p className={styles.st_title}>Monthly Product Sale</p>
        </div>
      </div>
      <div className={styles.stcard}>
        <div className={styles.stimg}><img className={styles.bagimg} src={Bag}/>
        <div className={styles.sticon}><CiDollar /> </div>
        <p className={styles.nb}>45.5K</p></div>
        <div className={styles.st_text}>
          <p className={styles.st_title}>Active Sallers in our website</p>
        </div>
      </div>


      <div className={styles.stcard}>
        <div className={styles.stimg}><img className={styles.bagimg} src={Bag}/>
        <div className={styles.sticon}><BiSolidShoppingBags /></div>
        <p className={styles.nb}>5K</p></div>
        <div className={styles.st_text}>
          <p className={styles.st_title}>Active Customer in our website</p>
        </div>
      </div>

      <div className={styles.stcard}>
        <div className={styles.stimg}><img className={styles.bagimg} src={Bag}/>
        <div className={styles.sticon}><FaSackDollar /></div>
        <p className={styles.nb}>45.5K</p></div>
        <div className={styles.st_text}>
          <p className={styles.st_title}>Anual gross sale in our site</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
