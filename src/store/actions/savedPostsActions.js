import axios from 'axios';

export const setSavedPosts = (userID) => {

    return (dispatch, getState) => {

    axios.get("http://192.168.10.212:8000/getposts/" + userID)
      .then(res => {

          let posts = res.data;
        
          dispatch({type: 'SET_SAVED', userID: userID, savedData: posts});
        }
      )

    }

      
}