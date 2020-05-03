import { ElementTypes, IElement } from "./Game";

export interface ITurn {
    index: string
    type: ElementTypes
}

interface IScore {
    created_at: number,
    score: number
}

interface ICurrentGame {
    turns: ITurn[] 
    game: IElement[][],
    created_at: number
}

export interface IGamePlay {
    current: ICurrentGame
    scores: IScore[]
}

const USER_GAME_PLAY:IGamePlay = {
    current: {
        turns:[],
        game: [],
        created_at: 0
    },
    scores: []
};

class GamePlay {

    private _userGamePlay: IGamePlay;

    get userGamePlay(): IGamePlay {

        this._userGamePlay = USER_GAME_PLAY;

        return this._userGamePlay;
    }
}

export const gamePlay = ():IGamePlay => {
     
    return {
        current: {
            turns:[],
            game: [],
            created_at: 0
        },
        scores: []
    };
}