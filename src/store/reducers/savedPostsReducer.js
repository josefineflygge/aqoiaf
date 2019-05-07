
 const initState = {
 
     posts: []

}

const savedPostsReducer = (state = initState, action) => {

    switch(action.type){

        case("SET_SAVED"):
            console.log("Setting saved posts for id: ", action.userID)
            return {
                posts: action.savedData
            };

        default:
            return state;


    }

}

export default savedPostsReducer;