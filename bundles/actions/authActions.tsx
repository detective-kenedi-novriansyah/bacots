import axios, { AxiosResponse } from 'axios'
import { History } from 'history'
import { Dispatch } from 'redux'
import { AuthTypes } from '../constant/authSchma'

export const isAuthenticate = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get('api/v1/auth/is_authenticate/', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With, Authorization',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 2000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            dispatch({
                type: AuthTypes.IS_AUTHENTICATE,
                payload: {
                    is_authenticate: res.data
                }
            })
        }).catch((err: any) => {
            if(err.response.data) {
                dispatch({
                    type: AuthTypes.EXPIRES_TOKEN,
                    payload: {
                        validate: true,
                        message: {
                            message: err.response.data.detail,
                            validate: false
                        }
                    }
                })
                localStorage.clear()
                setTimeout(() => {
                    window.location.reload()
                }, 200);
            }
        })
        return response
    }
}

export const detailAuth = (newValue: string, history: History) => {
    return async (dispatch: Dispatch) => {
        let getValue: string;
        if(newValue.split('~').length > 2) {
            getValue = newValue.split('~')[1]
        } else {
            getValue = newValue.split('~')[0]
        }
        const response = await axios.get(`api/v1/auth/${getValue}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With, Authorization',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 2000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            dispatch({
                type: AuthTypes.DETAIL_AUTH,
                payload: {
                    data: res.data.authenticate,
                    content: res.data.content
                }
            })
            history.push({
                pathname: '/profile',
                search: `${res.data.authenticate.user.first_name}~${res.data.authenticate.public_id}`
            })
        }).catch((err: any) => {
            if(err.response.data) {
                dispatch({
                    type: AuthTypes.FAILURE_AUTH,
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