import {ON_OFF_STATUS} from "../../config/constant";
import {IEntityValidation} from "../validation/IEntity";

export interface IUser {
    username: string
    access_token?: string
}

