import React from 'react';

import { Menu, Segment } from 'semantic-ui-react';
import SignedInLinks from './SignedInLinks';
import styles from './Navigation.module.css';
//import SignedOutLinks from './SignedOutLinks';

const navigation = () => (

  <div className={styles.MenuContainer}>
     <Menu className={styles.Menu} inverted  secondary>
          <SignedInLinks />
      </Menu>
  </div>



);

export default navigation;