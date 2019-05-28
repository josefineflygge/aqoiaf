import React from 'react';

import Aux from '../../hoc/Auxillary';
import {NavLink} from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react';
import styles from './Navigation.module.css';


const signedOutLinks = () => {
    return (
        <Aux>
            <Menu.Item>
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/" exact > {/* activeClassName={classes.active} */}
                <Icon className={styles.Icon} size='large' name='home' />
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink  activeClassName={styles.Active} to="/" exact >
                <Icon size='big' name='shuffle' />
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