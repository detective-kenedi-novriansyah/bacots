import { Reducer } from 'redux'
import { ReportState, ReportTypes } from '../constant/reportSchema'

const initialState: ReportState = {
    report: [],
    data: {},
    validate: false,
    message: {}
}

export const reportReducer: Reducer<ReportState> = (state = initialState, action) => {
    switch (action.type) {
        case ReportTypes.REQUEST_REPORT:
            return {
                ...state,
                validate: action.payload.validate,
                message: action.payload.message
            }
            break;
        case ReportTypes.FAILURE_REPORT:
            return {
                ...state,
                validate: action.payload.validate,
                message: action.payload.message
            }
            break
        case ReportTypes.CLOSE_ALERT:
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