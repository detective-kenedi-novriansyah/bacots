import axios, { AxiosResponse } from 'axios'
import { History } from 'history'
import { Dispatch } from 'redux'
import { AuthTypes } from '../constant/authSchma'
import { ChoiceFollow, FollowState } from '../constant/interface'

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
                    is_authenticate: res.data.authenticate,
                    notification: res.data.notification
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
                    content: res.data.content,
                    is_active_follow: res.data.active
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

export const openDialogNotification = () => {
    return async (dispatch: Dispatch) => {
        const response = await dispatch({
            type: AuthTypes.OPEN_DIALOG_NOTIFICATION,
            payload: {
                is_open_notification: true
            }
        })
        return response
    }
}

export const retrieveAuth = (pk: number,data: FormData,setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return async(dispatch: Dispatch) => {
        const response = await axios.post(`api/v1/user/retrieve/${pk}/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accepted, Authorization, X-Reuqested-With',
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
                type: AuthTypes.RETRIEVE_AUTH,
                payload: {
                    is_authenticate: res.data.is_authenticate,
                    validate: true,
                    message: {
                        message: res.data.message,
                        validate: true
                    }
                }
            })
            setLoading(false)
        }).catch((err: any) => {
            if(err.response.data) {
                dispatch({
                    type: AuthTypes.FAILURE_AUTH,
                    payload: {
                        validate: true,
                        message: {
                            message: err.response.data.message ? err.response.data.message : err.response.data.detail,
                            validate: false
                        }
                    }
                })
                setLoading(false)
            }
        })
        return response
    }
}


export const requestFollow = (data: FollowState) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.post('api/v1/follow/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accepted, X-Requested-With, Authorization',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 201 && status < 300
        }).then((res: AxiosResponse<any>) => {
            dispatch({
                type: AuthTypes.FOLLOW_AUTH,
                payload: {
                    data: res.data.authenticate,
                    validate: true,
                    message: {
                        message: res.data.message,
                        validate: true
                    }
                }
            })
        }).catch((err: any) => {
            if(err.response.data) {
                dispatch({
                    type: AuthTypes.FAILURE_AUTH,
                    payload: {
                        validate: true,
                        message: {
                            message: err.response.data.message ? err.response.data.message : err.response.daa.detail,
                            validate: false
                        }
                    }
                })
            }
        })
        return response
    }
}

export const openDialogFollow = (choice: ChoiceFollow) => {
    return async (dispatch: Dispatch) => {
        const response = await dispatch({
            type: AuthTypes.SHOW_FOLLOW,
            payload: {
                choiceFollow: choice
            }
        })
        return response
    }
}