import React, { Component } from 'react';

import Aux from '../Auxillary';
import Navbar from '../../components/Navigation/Navigation';

class Layout extends Component {

    render () {
        return (
            <Aux>
                <Navbar />          
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;