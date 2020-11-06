import { Reducer } from 'redux'
import { ContentState, ContentTypes } from '../constant/contentSchema'

const initialState: ContentState = {
    content: [],
    detail: {},
    validate: false,
    message: {},
    openDialog: false,
    openRetrieveDialog: false
}

export const contentReducer: Reducer<ContentState> = (state = initialState, action) => {
    switch (action.type) {
        case ContentTypes.RECORD_CONTENT:
            return {
                ...state,
                content: [action.payload.content, ...state.content]
            }
            break
        case ContentTypes.DETAIL_CONTENT_DIALOG:
            return {
                ...state,
                detail: action.payload.detail,
                openDialog: action.payload.openDialog
            }
            break
        case ContentTypes.DESTROY_CONTENT:
            return {
                ...state,
                content: state.content.filter(function(x) {
                    return x.id !== action.payload.id
                }),
                validate: action.payload.validate,
                message: action.payload.message,
                openDialog: action.payload.openDialog
            }
            break
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
        case ContentTypes.CLOSE_ALERT:
            return {
                ...state,
                validate: action.payload.validate
            }
            break
        case ContentTypes.CLOSE_DIALOG:
            return {
                ...state,
                openDialog: action.payload.openDialog,
                openRetrieveDialog: action.payload.openRetrieveDialog
            }
            break
        case ContentTypes.RETRIEVE_CONTENT:
            return {
                ...state,
                content: state.content.map((x) => x.id === action.payload.pk ? action.payload.content : x),
                validate: action.payload.validate,
                message: action.payload.message,
                openRetrieveDialog: action.payload.openRetrieveDialog
            }
            break
        case ContentTypes.RETRIEVE_CONTENT_DIALOG:
            return {
                ...state,
                openRetrieveDialog: action.payload.openRetrieveDialog,
                detail: action.payload.detail
            }
            break
        default:
            return state
            break;
    }
}