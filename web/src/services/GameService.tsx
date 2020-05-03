import Axios, {AxiosResponse} from "axios";
import store from '../store';
import HttpClient from "../config/HttpClient";

const CreateGame = async():Promise<AxiosResponse> => {

    const query = ` mutation {
        createGame
        }`;

    const response = await HttpClient.post('http://localhost:3001/graphql', {query});


    return response;
}

const GameScores = async():Promise<AxiosResponse> => {

    const query = ` query {
            scores{
                created_at
                score
            }
        }`;

    const response = await HttpClient.post('http://localhost:3001/graphql', {query});


    return response;
}

const TurnService = async (turns: string[]): Promise<AxiosResponse> =>  {

    const query = ` mutation {
            play ( turns: "${turns.toString()}" ) {
                  index,
                  type
              }
            }`;

            console.log(query);

    const state = store.getState();

    const response = await Axios.post('http://localhost:3001/graphql', {query},
            {
                headers: {
                    Authorization: `Bearer ${state.Auth.user.access_token}`
                }
            }
    );


    return response;
};

export default {
    TurnService,
    CreateGame,
    GameScores
}