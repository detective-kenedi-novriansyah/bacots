import { Reducer } from 'redux'
import { AuthState, AuthTypes } from '../constant/authSchma'

const initialState: AuthState = {
    auth: [],
    data: {},
    is_authenticate: {},
    validate: false,
    message: {}
}

export const authReducer: Reducer<AuthState> = (state = initialState,action) => {
    switch (action.type) {
        case AuthTypes.IS_AUTHENTICATE:
            return {
                ...state,
                is_authenticate: action.payload.is_authenticate
            }
            break;
        case AuthTypes.EXPIRES_TOKEN:
            return {
                ...state,
                validate: action.payload.validate,
                message: action.payload.message
            }
            break
        case AuthTypes.CLOSE_ALERT:
            return {
                ...state,
                validate: action.payload.validate
            }
            break
        default:
            return state
            break;
    }
}