import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import {NavLink, Redirect} from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react';
import styles from './Navigation.module.css';
import {connect} from 'react-redux';


class signedOutLinks extends Component {

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

    render() {

        if(this.state.redirect){
            this.setState({redirect: false});
            return <Redirect to={"/" + this.state.searchObj.type + "/" + this.state.searchObj.name} />
        }
        else{

            return (
                <Aux>
                    <Menu.Item>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/" exact > {/* activeClassName={classes.active} */}
                        <Icon className={styles.Icon} size='large' name='home' />
                        </NavLink>
                    </Menu.Item>
        
                    <Menu.Item>
                                <Button circular size="small" inverted icon="shuffle" onClick={this.randomSearch}></Button>
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

    }
}

const mapStateToProps = (state) => {

    return{
      profile: state.firebase.profile,
      optionList: state.search.optionList,
    }

}


export default connect(mapStateToProps)(signedOutLinks);