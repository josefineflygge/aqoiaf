

const initState = {
    authError: null,
    loginError: null,
    signUpError: null
}

const authReducer = (state = initState, action) => {


    switch(action.type){

        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: action.err.message
            };

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loginError: null
            };
        
        case 'SIGNOUT_SUCCESS':
            return state = {
                ...state,
                authError: null
            };

        case 'SIGNOUT_ERROR':
            return state = {
                ...state,
                authError: action.err.message
            };

        case 'SIGNUP_ERROR':
            return state = {
                ...state,
                signUpError: action.err.message
            };

        case 'SIGNUP_SUCCESS':
            return state = {
                ...state,
                signUpError: null
            };
            
        default:
            return state;
        
    }

}

export default authReducer;