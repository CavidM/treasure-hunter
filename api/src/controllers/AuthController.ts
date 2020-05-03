import AuthBll from '../bll/AuthBll';
import BaseController from "./BaseController";
import {User} from "../entity/user/User";
import Authentication from "../decorators/auth/Authentication";
import {IUser} from "../models/entity/IUser";
import {IContext} from "../models/graphql/IGraphql";
import {ILogin} from "../models/forms/auth/ILogin";
import Rbac from "../decorators/auth/Rbac";
import {AUTH_ENTITIES, AUTH_OPERATIONS} from "../config/constant";
import UserRepository from "../dal/UserRepository";
import Store from "../components/Store";

export default class AuthController extends BaseController {
    protected bll: AuthBll;

    constructor() {
        super();
        this.bll = new AuthBll(new UserRepository());

        this.me = this.me.bind(this);
        this.register = this.register.bind(this);
    }

    // @Authentication
    // @Rbac([2, 5])
    public async me(args: any, context: IContext): Promise<any> {

        try {

            return {
                id: 11,
                username: 'test',
                access_token: 'String'
            }

        } catch (e) {

            this.logger.error(e);
        }
    }

    public async register(args: any, context: IContext): Promise<any> {

        try {
            let model = new User();

            model.load(args);

            this.validate(model, model.schema());

            const res = await this.bll.register(model);

            return res;
        
        }
        catch(e) {
            console.log(e);
            return this.catchError(e);
        }
    }

}
