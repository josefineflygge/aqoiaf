import React from 'react';

import { Menu, Segment } from 'semantic-ui-react';
import SignedInLinks from './SignedInLinks';
//import SignedOutLinks from './SignedOutLinks';

const navigation = () => (

  <Segment style={{backgroundColor: "#282c34", top: '0px',  width: '100%', position: 'fixed'}} inverted>
     <Menu style={{backgroundColor: "#282c34"}} inverted  secondary>
          <SignedInLinks />
      </Menu>
  </Segment>



);

export default navigation;