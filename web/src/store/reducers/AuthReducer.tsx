import {LOGIN_ACTION} from '../../config/constants';

let initialState = {
    user: {
        username: '',
        access_token: ''
    }
}

let reduxStore = localStorage.getItem('redux-store');

if(reduxStore) {

    let reduxStoreObj = JSON.parse(reduxStore);

    initialState = reduxStoreObj.Auth;
}

const AuthReducer = (state = initialState, action:any) => {
    const { payload } = action;

    switch (action.type) {
        case LOGIN_ACTION:
            return {
                ...state,
                user: payload
            };
        default:
            return state;
    }
};

export default AuthReducer;