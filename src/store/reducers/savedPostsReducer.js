
 const initState = {
 
     posts: []

}

const savedPostsReducer = (state = initState, action) => {

    switch(action.type){

        case("GET_SAVED"):
            console.log("Getting saved posts for id: ", action.userID)
            return {
                posts: action.savedData
            };

        default:
            return state;


    }

}

export default savedPostsReducer;