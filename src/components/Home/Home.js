import React from 'react';

import GotSearcher from '../../containers/GotSearcher/GotSearcher';
import styles from './Home.module.css';

const home = () => {
 
  return(
    <div className={styles.HomeContainer}>
      <div className={styles.TitleContainer}>
      <h1>A Wiki of Thrones</h1>
      </div>
      <GotSearcher />
    </div>
  )
};

export default home;