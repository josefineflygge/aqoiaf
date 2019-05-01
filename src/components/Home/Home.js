import React from 'react';

import GotSearcher from '../../containers/GotSearcher/GotSearcher';

const home = () => (
  <div style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
    <div style={{width: '25em', paddingBottom: '2em'}}>
    <h1>A Wiki of Thrones</h1>
    </div>
    <GotSearcher />
  </div>
);

export default home;