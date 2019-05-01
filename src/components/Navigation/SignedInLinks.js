import React from 'react';
import {NavLink} from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react';
import Aux from '../../hoc/Auxillary';

const signedInLinks = () => {
    return (
        <Aux>
            <Menu.Item>
                <NavLink to="/" exact > {/* activeClassName={classes.active} */}
                <Icon size='big' name='home' />
                </NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/profile">
                <Icon size='big' name='user' />
                </NavLink>
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    <NavLink to="/">
                        <Button inverted>Log Out</Button>
                    </NavLink>
                </Menu.Item>
            </Menu.Menu>
        </Aux>
    )
}

export default signedInLinks;