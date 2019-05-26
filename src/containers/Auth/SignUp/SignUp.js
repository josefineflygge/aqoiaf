import React, { Component } from 'react'
import {Button, Message, Segment, Grid, Form} from 'semantic-ui-react';
import {signUp} from '../../../store/actions/authActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import styles from '../SignInUp.module.css';
import {Link} from 'react-router-dom';

class SignUp extends Component {

    state = {
        
        firstName: "",
        lastName: "",
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
        this.props.signUp(this.state)

    }


  render() {

    const { signUpError } = this.props;

    const {auth} = this.props;
    if(auth.uid) {
      return <Redirect to="/"></Redirect>
    } 


    return (
      


    <div className={styles.Container}>
          <Grid textAlign='center' style={{ height: '100vh', width:'inherit' }} verticalAlign='middle'>
            <Grid.Column >
              <h2>
                Sign Up
              </h2>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input id="firstName" fluid icon='user' iconPosition='left' placeholder='First name' onChange={this.handleChange} />
                  <Form.Input id="lastName" fluid icon='user' iconPosition='left' placeholder='Last name' onChange={this.handleChange} />
                  <Form.Input
                    id="email"
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='E-mail'
                    type='email'
                    onChange={this.handleChange} 
                  />
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
                    Register
                  </Button>
                </Segment>
               
              </Form>
              <Message size="mini">
            Already have an account? <Link to='/signin'>Sign In</Link>
            { signUpError ? (<p>{signUpError}</p>) : null}
           </Message>
            </Grid.Column>
          </Grid>
      


      </div>
    )
  }
}

const mapStateToprops = (state) => {
    return{
      signUpError: state.auth.signUpError,
      auth: state.firebase.auth
    }
  }


const mapDispatchToProps = (dispatch) => {

    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}




export default connect(mapStateToprops, mapDispatchToProps)(SignUp);
