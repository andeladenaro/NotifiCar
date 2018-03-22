import {
    USER_LOGIN_SUCCESS,
    USER_IS_LOGGED,
} from '../actions/types';

const INITIAL_STATE = {
    accessToken: '',
    userID: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                userID: action.payload.userID
            };
        case USER_IS_LOGGED:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                userID: action.payload.userID
            };
        default:
            return state;
    }
};