import React, { Component } from 'react'
import {Button, Input, Icon, Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import { signIn } from '../../../store/actions/authActions';
import {Redirect} from 'react-router-dom';

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

    const { authError } = this.props;

    const {auth} = this.props;
    if(auth.uid) {
      return <Redirect to="/"></Redirect>
    } 

    return (
      <div>
          <h2>Sign in</h2>
        <Form onSubmit={this.handleSubmit}>
            <Form.Field>
            <label >E-mail</label>
            <Input id="email" iconPosition='left' placeholder='Email' onChange={this.handleChange}>
                <Icon name='at' />
                <input />
            </Input>
            </Form.Field>
        
            <Form.Field>
            <label>Password</label>
            <Input type="password" id="password" placeholder='Password' onChange={this.handleChange} />
            </Form.Field>

            <Button type='submit' content='Login' icon='right arrow' labelPosition='right' />
            <div style={{marginTop: '20px'}}>
              { authError ? (<p>{authError}</p>) : null}
            </div>
        </Form>


      </div>
    )
  }
}

const mapStateToprops = (state) => {
  console.log("Firebase :", state.firebase);
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    signIn: (creds) => dispatch(signIn(creds))
  }

}

export default connect(mapStateToprops, mapDispatchToProps)(SignIn);
