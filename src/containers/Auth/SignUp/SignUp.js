import React, { Component } from 'react'
import {Button, Icon, Input, Form} from 'semantic-ui-react';
import {signUp} from '../../../store/actions/authActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

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
        console.log("State: ", this.state)
        this.props.signUp(this.state)

    }


  render() {

    const { authError } = this.props;

    const {auth} = this.props;
    if(auth.uid) {
      return <Redirect to="/"></Redirect>
    } 


    return (
      <div>
          
        <Form onSubmit={this.handleSubmit}>
            <Form.Field>
                <label>First Name</label>
                <Input id="firstName"  iconPosition='left' placeholder='First Name' onChange={this.handleChange}>
                    <Icon name='user' />
                    <input />
                </Input>
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <Input id="lastName"  iconPosition='left' placeholder='Last Name' onChange={this.handleChange}>
                    <Icon name='user' />
                    <input />
                </Input>
            </Form.Field>

            <Form.Field>
                <label >E-mail</label>
                <Input type="text" id="email" iconPosition='left' placeholder='E-mail' onChange={this.handleChange}>
                    <Icon name='at' />
                    <input />
                </Input>
            </Form.Field>
        

            <Form.Field>
                <label>Password</label>
                <Input id="password" placeholder='Password' onChange={this.handleChange} />
            </Form.Field>
          
            <Button type='submit' content='Register' icon='right arrow' labelPosition='right' />
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

    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}




export default connect(mapStateToprops, mapDispatchToProps)(SignUp);
