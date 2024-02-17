import React from 'react';
import styles from './Queries.module.css';

const SingleQuery = ({ selectedQuery }) => {
  console.log("selectedQuery:", selectedQuery);

  if (!selectedQuery || Object.keys(selectedQuery).length === 0) {
    return (
      <div className={styles.placeholder}>
        <p>Please click on a message to view its content.</p>
      </div>
    );
  }

  return (
    <div key={selectedQuery._id}>
      <p className='text-black'>
        {selectedQuery.name}  
        <span className={styles.time}>{new Date(selectedQuery.timestamp).toLocaleString('en-GB')}</span>
      </p>
      <p className='text-gray-500 mt-2 mb-10'>{selectedQuery.email}</p>
      <div>{selectedQuery.text}</div>
    </div>
  );
}

export default SingleQuery;
