import { Reducer } from 'redux'
import { AuthState, AuthTypes } from '../constant/authSchma'

const initialState: AuthState = {
    auth: [],
    data: {},
    content: [],
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
        case AuthTypes.DETAIL_AUTH:
            return {
                ...state,
                data: action.payload.data,
                content: action.payload.content
            }
            break
        case AuthTypes.FAILURE_AUTH:
            return {
                ...state,
                validate: action.payload.validate,
                message: action.payload.message
            }
            break
        case AuthTypes.RECORD_CONTENT:
            return {
                ...state,
                content: state.content.map((x) => x.id === action.payload.id ? action.payload.content : x)
            }
            break
        case AuthTypes.DESTROY_CONTENT:
            return {
                ...state,
                content: state.content.filter(function(x) {
                    return x.id !== action.payload.id
                })
            }
            break
        case AuthTypes.RETRIEVE_CONTENT:
            return {
                ...state,
                content: state.content.map((x) => x.id === action.payload.id ? action.payload.content : x)
            }
            break
        default:
            return state
            break;
    }
}