

const initState = {
 
    optionList: "",

}


const searchReducer = (state = initState, action) => { 

    switch(action.type){

            case 'SET_OPTIONS':

            console.log("Set options in reducer ")

            return {
                ...state,
                    optionList: [
                        {
                            title: 'Characters',
                            options: action.charList
                        },
                        {
                            title: 'Houses',
                            options: action.houseList
                        },
    
                        {
                            title: 'Battles',
                            options: action.battleList
                        },
                    ]
            }

            default:
            return state;
    };
            
            
        
        
}


export default searchReducer;