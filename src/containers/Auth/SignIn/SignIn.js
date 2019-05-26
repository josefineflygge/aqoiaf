import React, { Component } from 'react'
import {Button, Message, Segment, Grid, Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import { signIn } from '../../../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import styles from '../SignInUp.module.css';
import {Link} from 'react-router-dom';

class SignIn extends Component {

    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
    
        this.setState({
            [e.target.id]: e.target.value
        })


    }

    handleSubmit = (e) => {

        e.preventDefault(); //don't refresh on submit
        this.props.signIn(this.state);

    }

  render() {

    const { loginError } = this.props;

    const {auth} = this.props;
    if(auth.uid) {
      return <Redirect to="/"></Redirect>
    } 

    return (
      <div className={styles.Container}>
          <Grid textAlign='center' style={{ height: '100vh', width:'inherit' }} verticalAlign='middle'>
            <Grid.Column >
              <h2>
                Sign in
              </h2>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input id="email" fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
                  <Form.Input
                    id="password"
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange} 
                  />
                  <Button type='submit' color='grey' fluid size='large'>
                    Login
                  </Button>
                </Segment>
               
              </Form>
              <Message size="mini">
            New user? <Link to='/signup'>Sign Up</Link>
            { loginError ? (<p>{loginError}</p>) : null}
           </Message>
            </Grid.Column>
          </Grid>
      


      </div>
    )
  }
}

const mapStateToprops = (state) => {
  return{
    loginError: state.auth.loginError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    signIn: (creds) => dispatch(signIn(creds))
  }

}

export default connect(mapStateToprops, mapDispatchToProps)(SignIn);
