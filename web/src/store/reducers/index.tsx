import {combineReducers} from "redux";
import Auth from "../reducers/AuthReducer";
import Game from '../reducers/GameReducer';

const AppReducer = combineReducers({
    Auth,
    Game
})

export default AppReducer;