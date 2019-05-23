import axios from 'axios';

export const setSavedPosts = (userID) => {

    return (dispatch, getState) => {

    //external ip adress
    axios.get("http://83.227.100.168:42132/getposts/" + userID)
      .then(res => {

          let posts = res.data;
        
          dispatch({type: 'SET_SAVED', userID: userID, savedData: posts});
        }
      )

    }

      
}