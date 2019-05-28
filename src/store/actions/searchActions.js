
export const setOptions = (chars, battles, houses) => {

    return (dispatch, getState) => {
  
          dispatch({type: 'SET_OPTIONS', charList: chars, battleList: battles, houseList: houses});
        
    }

      
}
