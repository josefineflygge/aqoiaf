import React, { Component } from 'react';

import PostsList from '../../components/SavedPostsList/SavedPostsList';
import { connect } from 'react-redux';
import styles from './UserProfile.module.css';
import { setSavedPosts } from '../../store/actions/savedPostsActions';
import { Redirect } from 'react-router-dom';

class UserProfile extends Component {

  state = {
    userID: "testuser" //dummy
  }

  componentDidMount(){

    //fetch saved posts from database and sets it in reducer
    this.props.setSavedPosts(this.state.userID);
    console.log("profile", this.props.profile);

  }

  render(){

    const {auth, profile} = this.props;
    if(!auth.uid) {
      return <Redirect to="/signin"></Redirect>
    } 
  
    return(
      <div>
        <div className={styles.Container}>
          <h2>Hi {profile.firstName}.</h2>
          <PostsList posts={this.props.savedPosts}/>
        </div>
      </div>
    )

  }

  
};

//To acess the redux store's state in this component

const mapStateToProps = (state) => {

    return{
      savedPosts: state.savedPosts.posts,
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }

}

const mapDispatchToProps = (dispatch) => {

  return {
    setSavedPosts: (userID) => dispatch(setSavedPosts(userID))
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile); //connect returns a hoc to take in the userProfile