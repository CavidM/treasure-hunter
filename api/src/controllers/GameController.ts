import BaseController from "./BaseController";
import {User} from "../entity/user/User";
import Authentication from "../decorators/auth/Authentication";
import {IContext} from "../models/graphql/IGraphql";
import GameBll from '../bll/GameBll';
import Cache from "../components/Store";
import { IUser } from "models/entity/IUser";
import { ElementTypes, ElementLimits } from "../components/Game";
import Store from "../components/Store";

export default class GameController extends BaseController {
    protected bll: GameBll;

    constructor() {
        super();
        this.bll = new GameBll();

        this.createGame = this.createGame.bind(this);
        this.play = this.play.bind(this);
        this.scores = this.scores.bind(this);
    }
    
    @Authentication
    public async createGame(args: any, context: IContext): Promise<any> {

        try {

            let res:any = [];

            if(typeof context.req.user !== 'undefined') {

                let user: IUser = context.req.user;

                res = this.bll.create(user.username);
            }

            return true;
        
        }
        catch(e) {
            console.log(e);
            return this.catchError(e);
        }
    }

    @Authentication
    public async play(args: any, context: IContext): Promise<any> {

        try {
            if(typeof context.req.user !== 'undefined') {

                let user: IUser = context.req.user;

                const res = this.bll.play(args.turns.split(','), user.username);

                console.log(Store().get(user.username));

                console.log('turnsss: ',res.finalTurns);

                return res.finalTurns;
            }
        }
        catch(e) {
            return this.catchError(e);
        }
    }

    @Authentication
    public async scores(args: any, context: IContext): Promise<any> {

        try {
            if(typeof context.req.user !== 'undefined') {

                let user: IUser = context.req.user;

                const scores = this.bll.scores(user.username);


                return scores;
            }
        }
        catch(e) {
            return this.catchError(e);
        }
    }

}
