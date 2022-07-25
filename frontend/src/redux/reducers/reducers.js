import {
    ADD_MESSAGE,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    GET_USER_CONTACTS_FAILURE,
    GET_USER_CONTACTS_REQUEST,
    GET_USER_CONTACTS_SUCCESS,
    AUTHENTICATE_USER_FAILURE,
    AUTHENTICATE_USER_REQUEST,
    AUTHENTICATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_LOGOUT,
} from "../constants/constants";

export const messagesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newState;
            if (state[action.payload.chatId]) {
                newState = { ...state };
                newState[action.payload.chatId] = [
                    ...state[action.payload.chatId],
                    action.payload.messageData,
                ];
            } else {
                newState = { ...state };
                newState[action.payload.chatId] = [action.payload.messageData];
            }
            return newState;
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
            };
        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case REGISTER_USER_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const authUserReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER_REQUEST:
            return {
                loading: true,
                tokenVerified: false,
            };
        case AUTHENTICATE_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                tokenVerified: true,
            };
        case AUTHENTICATE_USER_FAILURE:
            return {
                loading: false,
                error: action.payload,
                tokenVerified: false,
            };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userContactsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_CONTACTS_REQUEST:
            return {
                loading: true,
            };
        case GET_USER_CONTACTS_SUCCESS:
            return {
                loading: false,
                contactlist: action.payload,
            };
        case GET_USER_CONTACTS_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const updateUserReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {
                loading: true,
            };
        case UPDATE_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case UPDATE_USER_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
