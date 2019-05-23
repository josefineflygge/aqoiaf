import React from 'react';
import {NavLink} from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react';
import Aux from '../../hoc/Auxillary';

import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';

const signedInLinks = (props) => {
    return (
        <Aux>
            <Menu.Item >
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
                        <Button onClick={props.signOut} inverted>Log Out</Button>
                </Menu.Item>
            </Menu.Menu>
        </Aux>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(signedInLinks);