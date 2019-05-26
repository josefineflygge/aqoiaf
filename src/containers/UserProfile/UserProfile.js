import React, { Component } from 'react';

import PostsList from '../../components/SavedPostsList/SavedPostsList';
import { connect } from 'react-redux';
import styles from './UserProfile.module.css';
import { getSavedPosts } from '../../store/actions/savedPostsActions';
import { Redirect } from 'react-router-dom';

class UserProfile extends Component {

  state = {
    postImgs: []
  }

  componentDidMount(){
    //fetch saved posts from database and sets it in reducer
    this.props.getSavedPosts(this.props.auth.uid);
  }


  render(){

    const {auth, profile} = this.props;
    if(!auth.uid) {
      return <Redirect to="/signin"></Redirect>
    } 
  
    return(
      <div className={styles.BigContainer}>
        <div className={styles.Container}>
        <h3>{profile.firstName}s profile</h3>
          <h3>Saved posts</h3>
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
    getSavedPosts: (userID) => dispatch(getSavedPosts(userID))
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile); //connect returns a hoc to take in the userProfile