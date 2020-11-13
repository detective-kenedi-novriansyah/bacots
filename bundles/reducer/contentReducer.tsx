import { Reducer } from 'redux'
import { ContentState, ContentTypes } from '../constant/contentSchema'

const initialState: ContentState = {
    content: [],
    detail: {},
    softDetail: false,
    validate: false,
    message: {},
    activeReport: false,
    openDialog: false,
    openDialogReport: false,
    loadingScreen: true,
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
                openDialog: action.payload.openDialog,
                softDetail: action.payload.softDetail
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
                openRetrieveDialog: action.payload.openRetrieveDialog,
                openDialogReport: action.payload.openDialogReport
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
                detail: action.payload.detail,
                softDetail: action.payload.softDetail
            }
            break
        case ContentTypes.LIKES_CONTENT:
            return {
                ...state,
                content: state.content.map((x) => x.id === action.payload.id ? action.payload.content : x)
            }
            break
        case ContentTypes.COMMENT_CONTENT:
            return {
                ...state,
                content: state.content.map((x) => x.id === action.payload.id ? action.payload.content : x)
            }
            break
        case ContentTypes.MOVE_DETAIL_CONTENT:
            return {
                ...state,
                detail: action.payload.detail,
                loadingScreen: action.payload.loadingScreen
            }
            break
        case ContentTypes.DETAIL_CONTENT:
            return {
                ...state,
                detail: action.payload.detail,
                loadingScreen: action.payload.loadingScreen
            }
            break
        case ContentTypes.DESTROY_COMMENT:
            return {
                ...state,
                content: state.content.map((x) => x.id === action.payload.id ? action.payload.content : x)
            }
            break
        case ContentTypes.DESTROY_DETAIL_COMMENT:
            return {
                ...state,
                detail: action.payload.detail,
            }
            break
        case ContentTypes.DIALOG_REPORT:
            return {
                ...state,
                openDialogReport: action.payload.openDialogReport,
                detail: action.payload.detail,
                activeReport: action.payload.activeReport
            }
            break
        default:
            return state
            break;
    }
}