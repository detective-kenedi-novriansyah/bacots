import axios, { AxiosResponse } from 'axios'
import { History } from 'history'
import { Dispatch } from 'redux'
import { ChangeSecurityState, LoginUser, RecordUser, ResetUser, RetrieveUser } from '../constant/interface'
import { UserTypes } from '../constant/userSchema'

export const requestUser = (data: LoginUser, setData: React.Dispatch<React.SetStateAction<LoginUser>>) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.post('api-token-auth/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With'
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 2000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            setData({
                ...data,
                username: '',
                password: '',
                loading: false
            })
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('token_id', res.data.refresh_token)
            localStorage.setItem('token_id_', res.data.refresh_token_)
            window.location.reload()
        }).catch((err: any) => {
            if(err.response.data) {
                setData({
                    ...data,
                    loading: false
                })
                dispatch({
                    type: UserTypes.FAILURE_USER,
                    payload: {
                        validate: true,
                        message: {
                            message: err.response.data.non_field_errors[0],
                            validate: false
                        }
                    }
                })
            }
        })
        return response
    }
}

export const recordUser = (data: RecordUser, setData: React.Dispatch<React.SetStateAction<RecordUser>>, history: History) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.post('api/v1/user/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With'
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 2000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 201 && status < 300
        }).then((res: AxiosResponse<any>) => {
            dispatch({
                type: UserTypes.REQUEST_USER,
                payload: {
                    validate: true,
                    message: {
                        message: res.data.message,
                        validate: true
                    }
                }
            })
            setData({
                ...data,
                username: '',
                email: '',
                password: '',
                confirm_password: '',
                loading: false
            })
            setTimeout(() => {
                history.push('/signin')
            }, 200);
        }).catch((err: any) => {
            if(err.response.data) {
                setData({
                    ...data,
                    loading: false
                })
                dispatch({
                    type: UserTypes.FAILURE_USER,
                    payload: {
                        validate: true,
                        message: {
                            message: err.response.data.message ,
                            validate: false
                        }
                    }
                })
            }
        })
        return response
    }
}

export const resetUser = (data: ResetUser, setData: React.Dispatch<React.SetStateAction<ResetUser>>,history: History) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.post('api/v1/user/reset/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With',
                'Access-Control-Allow-Origin': '*'
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            dispatch({
                type: UserTypes.REQUEST_USER,
                payload: {
                    validate: true,
                    message: {
                        message: res.data.message,
                        validate: true
                    }
                }
            })
            setData({
                ...data,
                token: '',
                loading: false
            })
            history.push('/signin')
        }).catch((err: any) => {
            if(err.response.data) {
                setData({
                    ...data,
                    loading: false
                })
                dispatch({
                    type: UserTypes.FAILURE_USER,
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

export const revokedUser = (history: History) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get('api/v1/user/revoked/token/', {
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
                type: UserTypes.REVOKED_TOKEN
            })
            localStorage.clear()
            setTimeout(() => {
                window.location.reload()
                history.push('/signin')
            }, 400);
        }).catch((err: any) => {
            dispatch({
                type: UserTypes.FAILURE_USER,
                payload: {
                    validate: true,
                    message: {
                        message: err.response.data.detail,
                        validate: false
                    }
                }
            })
        })
        return response
    }
}

export const retrieveUserSecurity = (data: ChangeSecurityState, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.post('api/v1/user/retrieve/user/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accepted, X-Requested-With, Authorization',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            dispatch({
                type: UserTypes.RETRIEVE_SECURITY,
                payload: {
                    validate: true,
                    message: {
                        message: res.data.message,
                        validate: true
                    }
                }
            })
            setLoading(false)
            const old_pass = (document.getElementById('knd-input-change-old-password') as HTMLInputElement)
            const new_pass = (document.getElementById('knd-input-change-new-password') as HTMLInputElement)
            const con_pass = (document.getElementById('knd-input-change-confirm-password') as HTMLInputElement)
            old_pass.value = '';
            new_pass.value = '';
            con_pass.value = '';
        }).catch((err: any) => {
            if(err.response.data) {
                dispatch({
                    type: UserTypes.FAILURE_USER,
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

export const retrieveUserUsernameAndEmail = (data: RetrieveUser, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.put('api/v1/user/retrieve/user/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Allow-Origin': '*',
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
                type: UserTypes.RETRIEVE_SECURITY,
                payload: {
                    validate: true,
                    message: {
                        message: res.data.message,
                        validate: true
                    }
                }
            })
            setLoading(false)
            const username = (document.getElementById('knd-input-settings-username') as HTMLInputElement)
            const email = (document.getElementById('knd-input-settings-email') as HTMLInputElement)
            const password = (document.getElementById('knd-input-password-change-email') as HTMLInputElement)
            username.value = '';
            email.value = '';
            password.value = '';
        }).catch((err: any) => {
            if(err.response.data) {
                dispatch({
                    type: UserTypes.FAILURE_USER,
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

export const forgotUser = (pk: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get(`api/v1/user/forgot/user/${pk}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accepted, Authorization, X-Requested-With',
                'Access-Control-Allow-Methods': 'GET',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            dispatch({
                type: UserTypes.REQUEST_USER,
                payload: {
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
                    type: UserTypes.FAILURE_USER,
                    payload: {
                        validate: false,
                        message: {
                            message: err.response.data.detail,
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