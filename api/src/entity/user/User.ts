import {IUser} from "../../models/entity/IUser";
import * as Joi from 'joi';
import {IEntityValidation} from "../../models/validation/IEntity";

export class User {

    username: string;
    
    constructor(id?: number) {
        // id && (this.id = id);
    }

    load(obj: IUser) {

        this.username = obj.username;

        return this;
    }

    schema() {
        return Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(255).required(),
        });
    }
}

