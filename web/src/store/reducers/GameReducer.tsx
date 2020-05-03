import { PLAY_TURN_ACTION, CREATE_GAME, GET_SCORES } from "../../config/constants";

let reduxStore = localStorage.getItem('redux-store');

const emptyGameDashboard = () => {
  return Array.from(new Array(5), val => {
    return Array.from(new Array(5), inVal => {
      return {
        type: null
      };
    });
  });
}

let initialState = {
  current: emptyGameDashboard(),
  scores: []
}

if(reduxStore) {
  let reduxStoreObj = JSON.parse(reduxStore);

  initialState = reduxStoreObj.Game;
}
  

const GameReducer = (state = initialState, action:any) => {
    
    const {payload} = action;

    switch(action.type) {
      case CREATE_GAME: {

        alert('reset');

        return {
          ...state,
          current: emptyGameDashboard()
        };
      }
      case PLAY_TURN_ACTION: {

        let game = [...state.current];

        payload.forEach((element:any) => {

          let index = element.index.split('');

          game[index[0]][index[1]].type = element.type;
        });

        return {
          ...state,
          current: game
        };
      }
      case GET_SCORES: {
        
        return {
          ...state,
          scores: payload.scores
        }
      }
        default:
            return state;
    }
}

export default GameReducer;