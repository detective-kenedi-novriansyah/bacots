import { Reducer } from 'redux'
import { UserState, UserTypes } from '../constant/userSchema'

const initialState: UserState = {
    user: [],
    data: {},
    validate: false,
    message: {}
}

export const userReducer: Reducer<UserState> = (state = initialState, action) => {
    switch (action.type) {
        case UserTypes.REQUEST_USER:
            return {
                ...state,
                validate: action.payload.validate,
                message: action.payload.message
            }
            break;
        case UserTypes.FAILURE_USER:
            return {
                ...state,
                validate: action.payload.validate,
                message: action.payload.message
            }
            break
        case UserTypes.CLOSE_ALERT:
            return {
                ...state,
                validate: action.payload.validate
            }
            break
        case UserTypes.RETRIEVE_SECURITY:
            return {
                ...state,
                validate: action.payload.validate,
                message: action.payload.message
            }
            break
        default:
            return state
            break;
    }
}