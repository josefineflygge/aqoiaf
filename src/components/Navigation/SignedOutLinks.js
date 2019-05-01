import React from 'react';

import Aux from '../../hoc/Auxillary';
import {NavLink} from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react';


const signedOutLinks = () => {
    return (
        <Aux>
            <Menu.Item>
                <NavLink to="/" exact > {/* activeClassName={classes.active} */}
                <Icon size='large' name='home' />
                </NavLink>
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    <NavLink to ="/signin">
                     <Button inverted>Sign In</Button>
                    </NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to ="/signup">
                    <Button color='grey'>Sign Up</Button>
                    </NavLink>
                </Menu.Item>
            </Menu.Menu>
        </Aux>
    )
}

export default signedOutLinks;