import React, { Component } from 'react';

import PostsList from '../../components/SavedPostsList/SavedPostsList';
import { connect } from 'react-redux';
import styles from './UserProfile.module.css'

class UserProfile extends Component {

  render(){

    console.log(this.props.savedPosts);

    return(
      <div>
        <div className={styles.Container}>
          <PostsList posts={this.props.savedPosts}/>
        </div>
      </div>
    )

  }

  
};

//To acess the redux store's state in this component
const mapStateToProps = (state) => {

  return{
    savedPosts: state.savedPosts.posts
  }

}


export default connect(mapStateToProps)(UserProfile); //connect returns a hoc to take in the userProfile