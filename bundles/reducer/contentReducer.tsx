import { Reducer } from 'redux'
import { ContentState, ContentTypes } from '../constant/contntSchema'

const initialState: ContentState = {
    content: [],
    detail: {},
    validate: false,
    message: {}
}

export const contentReducer: Reducer<ContentState> = (state = initialState, action) => {
    switch (action.type) {
        case ContentTypes.LOAD_CONTENT:
            return {
                ...state,
                content: action.payload.content
            }
            break;
        case ContentTypes.FAILURE_CONTENT:
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