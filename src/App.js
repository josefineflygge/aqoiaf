import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import {Switch, Route} from 'react-router-dom';
import UserProfile from './containers/UserProfile/UserProfile';
import Home from './components/Home/Home';
import CharacterPostDetail from './components/Post/CharacterPost/CharacterPostDetail/CharacterPostDetail';
import SignIn from './containers/Auth/SignIn/SignIn';
import SignUp from './containers/Auth/SignUp/SignUp';
 

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Layout>
            <Switch>
              <Route path="/profile" component={UserProfile} />
              <Route path="/" exact component={Home} />
              <Route path="/character/:id" component={CharacterPostDetail} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </Layout>
        </header>
      </div>
    );
  }
}

export default App;
