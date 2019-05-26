import axios from 'axios';

export const getSavedPosts = (userID) => {

    return (dispatch, getState) => {

    //external ip adress
    axios.get("http://83.227.100.168:42132/getposts/U_" + userID)
      .then(res => {

          let posts = res.data;
        
          dispatch({type: 'GET_SAVED', userID: userID, savedData: posts});
        }
      )

    }

      
}