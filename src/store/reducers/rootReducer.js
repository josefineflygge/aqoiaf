import authReducer from './authReducer';
import savedPostsReducer from './savedPostsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({

    auth: authReducer,
    savedPosts: savedPostsReducer

})

export default rootReducer;