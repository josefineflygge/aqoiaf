import authReducer from './authReducer';
import savedPostsReducer from './savedPostsReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'; // to synk auth state on firebase with redux state

const rootReducer = combineReducers({

    auth: authReducer,
    savedPosts: savedPostsReducer,
    firebase: firebaseReducer

})

export default rootReducer;