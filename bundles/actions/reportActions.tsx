import axios, { AxiosResponse } from 'axios'
import { History } from 'history'
import { Dispatch } from 'redux'
import { ReportActive } from '../components/home/report'
import { ContentTypes } from '../constant/contentSchema'
import { Report } from '../constant/interface'
import { ReportTypes } from '../constant/reportSchema'

export const recordReport = (data: Report, setLoading: React.Dispatch<React.SetStateAction<boolean>>,report: ReportActive, setReport: React.Dispatch<React.SetStateAction<ReportActive>>,active: boolean, history: History) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.post('api/v1/report/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accepted, Authorization, X-Requested-With',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 2000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 201 && status < 300
        }).then((res: AxiosResponse<any>) => {
            dispatch({
                type: ReportTypes.REQUEST_REPORT,
                payload: {
                    validate: true,
                    message: {
                        message: res.data.message,
                        validate: true
                    }
                }
            })
            dispatch({
                type: ContentTypes.CLOSE_DIALOG,
                payload: {
                    openDialogReport: false
                }
            })
            setLoading(false)
            setReport({
                ...report,
                choice: -1,
                report: ''
            })
            if(active) {
                history.push('/')
            }
        }).catch((err: any) => {
            if(err.response.data) {
                setLoading(false)
                dispatch({
                    type: ReportTypes.FAILURE_REPORT,
                    payload: {
                        validate: true,
                        message: {
                            message: err.response.data.message ? err.response.data.message : err.response.data.detail,
                            validate: false
                        }
                    }
                })
            }
        })
        return response
    }
}