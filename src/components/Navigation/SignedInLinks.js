import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react';
import Aux from '../../hoc/Auxillary';

import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions';
//import logoImg from '../../assets/images/logo.png';
import {Fab} from '@material-ui/core';
import styles from './Navigation.module.css';

class signedInLinks extends Component {

    state = {
        redirect: false,
        searchObj: null
    }

    randomSearch = () => {

        let rand = Math.floor(Math.random() * Math.floor(3));
        let options = this.props.optionList;
        let randList = options[rand];

        let rand_2 = Math.floor(Math.random() * Math.floor(randList.options.length-1));
        let randObj = randList.options[rand_2];

        console.log("Random search: ", randObj);
        this.setState({redirect: true, searchObj: randObj});

    }

    componentDidMount(){
        this.setState({redirect: false, searchObj: null});
    }


    render(){

        if(this.state.redirect){
            this.setState({redirect: false});
            return <Redirect to={"/" + this.state.searchObj.type + "/" + this.state.searchObj.name} />
        }
        else{

            return (
                <Aux>
                    <Menu.Item >
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/" exact > 
                        <Icon size='big' name='home' />
                        </NavLink>
                    </Menu.Item>
        
                    <Menu.Item>
                        <Button circular size="small" inverted icon="shuffle" onClick={this.randomSearch}></Button>
                    </Menu.Item>

                    <Menu.Item >
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/forum" exact > 
                        <Icon size='big' name='comments' />
                        </NavLink>
                    </Menu.Item>
        
        
                    <Menu.Menu position='right'>
                    <Menu.Item>
                        <NavLink activeClassName={styles.Active} to="/profile">
                        <Fab style={{backgroundColor: '#607d8b'}} >
                            <b>{this.props.profile.initials}</b>
                        </Fab>
                        </NavLink>
                    </Menu.Item>
                        <Menu.Item>
                                <Button onClick={this.props.signOut} inverted>Log Out</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Aux>
            )


        }

    }


}

const mapStateToProps = (state) => {

    return{
      profile: state.firebase.profile,
      optionList: state.search.optionList,
    }

}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(signedInLinks);