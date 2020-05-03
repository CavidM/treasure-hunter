import {Dispatch} from "redux";
import GameService from '../../services/GameService';
import { IResponse } from "../../models";
import { PLAY_TURN_ACTION, CREATE_GAME, GET_SCORES } from "../../config/constants";

export const PlayTurn = (turns: string[]) => {

    return async(dispatch:Dispatch) => {
        
        return await GameService.TurnService(turns).then((res: IResponse) => {

            if (!res.errors) {
                const turns = res.data.data.play;

                dispatch({
                    type: PLAY_TURN_ACTION,
                    payload: turns
                });

                return true;
            }

            return false;
        })
    }
}

export const CreateGame = () => {

    return async(dispatch:Dispatch) => {
        
        return await GameService.CreateGame().then((res: IResponse) => {

            if (!res.errors) {

                dispatch({
                    type: CREATE_GAME,
                    payload: []
                });

                return true;
            }

            return false;
        })
    }
}

export const GameScores = () => {

    return async(dispatch:Dispatch) => {
        
        return await GameService.GameScores().then((res: IResponse) => {

            if (!res.errors) {

                dispatch({
                    type: GET_SCORES,
                    payload: res.data.data
                });

                return true;
            }

            return false;
        })
    }
}