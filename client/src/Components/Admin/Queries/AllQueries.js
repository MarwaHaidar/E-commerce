import React, { useState, useEffect } from 'react';
import styles from './Queries.module.css';
import SingleQuery from './SingleQuery';
import axios from 'axios';
import Cookies from 'js-cookie';

const AllQueries = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState({});
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/messages', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        });
        setQueries(response.data.data);
        console.log(queries)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  useEffect(() => {
    if (activeTab !== null && queries.length > 0) {
      setSelectedQuery(queries[activeTab]);
    }
  }, [activeTab, queries]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={styles.QueriesContainer}>
      <p className={styles.title}>All Queries</p>
      <main>
        <div className={styles.singleMessCont}>
          {queries.map((query, index) => (
            <div
              key={query._id}
              className={`${styles.singleMessage} ${activeTab === index ? styles.active : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {query.name}      
              <span className={styles.time}>{new Date(query.timestamp).toLocaleString('en-GB')}</span>


              <p>{query.email}</p>
            </div>
          ))}
        </div>

        <div className={styles.QueryContent}>
          <SingleQuery selectedQuery={selectedQuery} />
        </div>
      </main>
    </div>
  );
};

export default AllQueries;
