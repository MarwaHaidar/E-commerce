import React from 'react';
import styles from './vpb.module.css';

const ViewProductBtn = ({ text, onClick }) => {
  return (
    <div>
      <div className={styles.btncontainer}>
        <button className={styles.vpbtn} onClick={onClick}>{text}</button>
      </div>
    </div>
  );
};

export default ViewProductBtn;


