import { Reducer } from 'redux'
import { AuthState, AuthTypes } from '../constant/authSchma'

const initialState: AuthState = {
    auth: [],
    data: {},
    content: [],
    detail: {},
    choiceFollow: {
        followed: false,
        followers: false
    },
    is_open_notification: false,
    is_authenticate: {},
    is_active_follow: false,
    is_auth_active: false,
    validate: false,
    message: {},
    openDrawerAuth: false,
    openDialogAuth: false
}

export const authReducer: Reducer<AuthState> = (state = initialState,action) => {
    switch (action.type) {
        case AuthTypes.IS_AUTHENTICATE:
            return {
                ...state,
                is_authenticate: action.payload.is_authenticate,
                is_auth_active: action.payload.is_auth_active
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
                validate: action.payload.validate,
                is_open_notification: action.payload.is_open_notification,
            }
            break
        case AuthTypes.DETAIL_AUTH:
            return {
                ...state,
                data: action.payload.data,
                content: action.payload.content,
                is_active_follow: action.payload.is_active_follow,
                is_auth_active: action.payload.is_auth_active
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
        case AuthTypes.OPEN_DIALOG_NOTIFICATION:
            return {
                ...state,
                is_open_notification: action.payload.is_open_notification
            }
            break
        case AuthTypes.RETRIEVE_AUTH:
            return {
                ...state,
                validate: action.payload.validate,
                is_authenticate: action.payload.is_authenticate,
                message: action.payload.message
            }
            break
        case AuthTypes.FOLLOW_AUTH:
            return {
                ...state,
                data: action.payload.data,
                is_active_follow: action.payload.is_active_follow,
                validate: action.payload.validate,
                message: action.payload.message,
                is_auth_active: action.payload.is_auth_active
            }
            break
        case AuthTypes.SHOW_FOLLOW:
            return {
                ...state,
                choiceFollow: action.payload.choiceFollow
            }
            break
        case AuthTypes.HIDE_FOLLOW:
            return {
                ...state,
                choiceFollow: action.payload.choiceFollow
            }
            break
        case AuthTypes.FETCH_AUTH:
            return {
                ...state,
                auth: action.payload.auth,
                openDrawerAuth: action.payload.openDrawerAuth,
                detail: action.payload.detail,
                openDialogAuth: action.payload.openDialogAuth
            }
            break
        case AuthTypes.CLOSE_DRAWER:
            return {
                ...state,
                openDrawerAuth: action.payload.openDrawerAuth,
                openDialogAuth: action.payload.openDialogAuth
            }
            break
        case AuthTypes.FILTER_AUTH:
            return {
                ...state,
                auth: action.payload.auth,
            }
            break
        case AuthTypes.DETAIL_F_AUTH:
            return {
                ...state,
                detail: action.payload.detail
            }
            break
        default:
            return state
            break;
    }
}