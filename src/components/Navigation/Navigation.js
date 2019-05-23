import React from 'react';

import { Menu } from 'semantic-ui-react';
import SignedInLinks from './SignedInLinks';
import styles from './Navigation.module.css';
import { connect } from 'react-redux';
import SignedOutLinks from './SignedOutLinks'

const navigation = (props) => {

  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />; 

  return(
      <div className={styles.MenuContainer}>
        <Menu className={styles.Menu} inverted  secondary>
              {links}
          </Menu>
      </div>
  )



};

const mapStateToProps = (state) => {

  return{
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(navigation);