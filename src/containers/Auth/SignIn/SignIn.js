import React, { Component } from 'react'
import {Button, Input, Icon, Form} from 'semantic-ui-react';

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
        console.log(this.state.email, this.state.password)

    }

  render() {
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
        </Form>


      </div>
    )
  }
}

export default SignIn;
