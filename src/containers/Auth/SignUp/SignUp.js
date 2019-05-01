import React, { Component } from 'react'
import {Button, Icon, Input, Form} from 'semantic-ui-react';

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
        console.log(this.state.firstName, this.state.lastName, 
            this.state.email, this.state.password)

    }


  render() {
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
                <Input type="password" id="email" iconPosition='left' placeholder='E-mail' onChange={this.handleChange}>
                    <Icon name='at' />
                    <input />
                </Input>
            </Form.Field>
        

            <Form.Field>
                <label>Password</label>
                <Input id="password" placeholder='Password' onChange={this.handleChange} />
            </Form.Field>
          
            <Button type='submit' content='Register' icon='right arrow' labelPosition='right' />
        </Form>


      </div>
    )
  }
}

export default SignUp;
