import UserRepository from "../dal/UserRepository";
import errorCodes from '../utils/response/errors';
import {IUser} from "../models/entity/IUser";
import UserError from "../utils/UserError";
import * as bcrypt from 'bcryptjs';
import {ILogin} from "../models/forms/auth/ILogin";
import Store from "../components/Store";
import { gamePlay } from "../components/GamePlay";

const jwt = require('jsonwebtoken');

export default class AuthBll {
    public userDal: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.userDal = UserRepository;
    }

    public async me(model: IUser): Promise<IUser> {

        // let user = await this.userDal.findByUserName(model.username);

        let user = {
            username: "aaa"
        }

        return user;
    }

    public async register(model: IUser): Promise<IUser> {

        let payload = {
            username: model.username
        };

        model.access_token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: 30 * 86400 // expires in 30 days
            }
        );

        Store().set(model.username, gamePlay());

        return model;
    }
}
