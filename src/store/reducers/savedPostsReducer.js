
 const initState = {
 
     posts: [],
     isLoading: true,

}

const savedPostsReducer = (state = initState, action) => {

    switch(action.type){

        case("GET_SAVED"):
            return {
                posts: action.savedData,
                isLoading: false
            };

        default:
            return state;


    }

}

export default savedPostsReducer;