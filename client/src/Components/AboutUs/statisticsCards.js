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

const StatisticsCard = ({ icon, value, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.circle}>
        <div className={styles.smallCircle}>
          <FontAwesomeIcon icon={icon} style={{ color: "#6B9499", fontSize: '30px' }} />
        </div>
      </div>
      <div><span style={{ color: 'whitesmoke', fontSize: '40px'}}>{value}</span></div>
      <div style={{ color: 'whitesmoke' }}>{text}</div>
    </div>
  );
};

export default StatisticsCard;
