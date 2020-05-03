import {Dispatch} from "redux";
import {ILoginForm, IResponse} from '../../models/index';
import Auth from '../../services/AuthService';
import {LOGIN_ACTION} from '../../config/constants';

export const Login = (loginForm: ILoginForm) => {

    console.log(loginForm);

    return async (dispatch: Dispatch): Promise<any> => {
        return await Auth.LoginService(loginForm).then((res: IResponse) => {

            console.log(res);

            if (!res.errors) {
                const user = res.data.data.register;

                dispatch({
                    type: LOGIN_ACTION,
                    payload: user
                });

                return true;
            }

            return false;
        })
    }
};