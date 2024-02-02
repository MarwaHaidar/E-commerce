import React from 'react';
import styles from './vpb.module.css';

const ViewProductBtn = ({ text }) => {
  return (
    <div>
      <div className={styles.btncontainer}>
        <button className={styles.vpbtn}>{text}</button>
      </div>
    </div>
  );
};

export default ViewProductBtn;