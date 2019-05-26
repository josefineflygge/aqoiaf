import axios from 'axios';

export const signIn = (credentials) => {

    return (dispatch, getState, {getFirebase}) => {

        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => { 
            dispatch({type: 'LOGIN_SUCCESS'}) 
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        });

    }

      
}

export const signOut = () => {

    return (dispatch, getState, {getFirebase}) => {

       const firebase = getFirebase();

       firebase.auth().signOut().then(() => {
           dispatch({type: 'SIGNOUT_SUCCESS'});
       }).catch((err) => {
           dispatch({type: 'SIGNOUT_ERROR', err});
       })

       firebase.logout();

    }

      
}

export const signUp = (newUser) => {

    return(dispatch, getState, {getFirebase, getFirestore}) => {

        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email, newUser.password
            ).then((resp) =>{

                console.log("resp uid", resp.user.uid)

                //Add user table to content DB, table name has to start with letter
                axios.get("http://83.227.100.168:42132/adduser/U_" + resp.user.uid)
                .then(res => {
                    console.log("Added user message:", res)
                    }
                )

                //resp.user
                return firestore.collection('users').doc(resp.user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0]+newUser.lastName[0]
                })
            }).then(() => {
                dispatch({type: 'SIGNUP_SUCCESS'})
            }).catch((err) =>{
                dispatch({type: 'SIGNUP_ERROR', err})
            })
            

    }



} 


