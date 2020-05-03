import BaseController from "../../controllers/BaseController";
import {UnauthorizedError} from "type-graphql";
import Logger from "../../utils/logger";
const jwt = require('jsonwebtoken');

export default function Authentication(target: BaseController, name: string, descriptor: PropertyDescriptor) {

    const original = descriptor.value;

    if (typeof original === 'function') {

        descriptor.value = async function (...args: any) {
            let ctx = args[1];

            try {
                let authStr = ctx.req.get('Authorization');

                if(!Boolean(authStr)) {

                    throw new UnauthorizedError();
                }

                // TODO replace with jwt split
                let token = authStr.split(' ')[1];
                let userSecret = jwt.verify(token, process.env.AUTH_SECRET);
// console.log(userJWT);
                // console.log('user -------------------------- ', ctx.req.user)
// console.log(userJWT);
ctx.req.user = userSecret;
// console.log(args);
                return original.apply(this, args);

            } catch (e) {
                (new Logger()).error(e);
                throw new UnauthorizedError();
            }
        }
    }
    return descriptor;
};
