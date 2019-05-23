import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'; //binds redux with the react app
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import firebaseConfig from './conifg/firebaseConfig';
//import axios from 'axios';

//axios.defaults.baseURL("http://192.168.10.212:8000");

const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebaseConfig),
        reactReduxFirebase(firebaseConfig, {useFirestoreForProfile: true,  userProfile: 'users', attachAuthIsReady: true})
    )
);


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


store.firebaseAuthIsReady.then(() => {

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();

})




