import {ILoginForm} from "../models/index";
import Axios, {AxiosResponse} from "axios";

const LoginService = async (loginForm: ILoginForm): Promise<AxiosResponse> =>  {
    const query = ` mutation {
            register ( username: "${loginForm.username}" ) {
                  username,
                  access_token
              }
            }`;

    const response = await Axios.post('http://localhost:3001/graphql', {query});


    return response;
};

export default {
    LoginService
}