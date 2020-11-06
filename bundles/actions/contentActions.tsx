import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { ContentTypes } from '../constant/contntSchema'

export const fetchContent = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get('api/v1/bacot/', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With'
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            dispatch({
                type: ContentTypes.LOAD_CONTENT,
                payload: {
                    content: res.data
                }
            })
        }).catch((err: any) => {
            if(err.response.data) {
                dispatch({
                    type: ContentTypes.FAILURE_CONTENT,
                    payload: {
                        validate: true,
                        message: {
                            message: err.response.data.detail,
                            validate: false
                        }
                    }
                })
            }
        })
        return response
    }
}