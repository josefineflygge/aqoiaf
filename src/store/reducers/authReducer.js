

const initState = {
    authError: null,
}

const authReducer = (state = initState, action) => {


    switch(action.type){

        case 'LOGIN_ERROR':
            console.log("Login failed")
            return {
                ...state,
                authError: "Login Failed"
            };

        case 'LOGIN_SUCCESS':

            console.log("Login sucess")
            return {
                ...state,
                authError: null
            };
        
        case 'SIGNOUT_SUCCESS':
            console.log("Sign Out Sucess");
            return state;

        case 'SIGNOUT_ERROR':
            console.log("Sign Out Error!");
            return state = {
                ...state,
                authError: "Sign out failed"
            };

        case 'SIGNUP_ERROR':
            console.log("Sign Up Error!");
            return state = {
                ...state,
                authError: action.err.message
            };

        case 'SIGNUP_SUCCESS':
            return state = {
                ...state,
                authError: null
            };
            
        default:
            return state;
        
    }

}

export default authReducer;