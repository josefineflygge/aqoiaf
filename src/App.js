import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import {Switch, Route} from 'react-router-dom';
import UserProfile from './containers/UserProfile/UserProfile';
import Home from './components/Home/Home';
import CharacterPostDetail from './components/Post/CharacterPost/CharacterPostDetail/CharacterPostDetail';
import SignIn from './containers/Auth/SignIn/SignIn';
import SignUp from './containers/Auth/SignUp/SignUp';
import BattlePostDetail from './components/Post/BattlePost/BattlePostDetail/BattlePostDetail';
import HousePostDetail from './components/Post/HousePost/HousePostDetail/HousePostDetail';
import Forum from './containers/Forum/Forum';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Layout>
            <Switch>
              <Route path="/profile" component={UserProfile} />
              <Route path="/forum" component={Forum} />
              <Route path="/" exact component={Home} />
              <Route path="/character/:name" exact  component={CharacterPostDetail} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/house/:name" component={HousePostDetail} />
              <Route path="/battle/:name" component={BattlePostDetail} />
            </Switch>
          </Layout>
        </header>
      </div>
    );
  }
}

export default App;
