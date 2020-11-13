import axios, { AxiosResponse } from 'axios'
import { History } from 'history'
import { Dispatch } from 'redux'
import { AuthTypes } from '../constant/authSchma'
import { ContentTypes } from '../constant/contentSchema'
import { CommentContent, Content, DestroyCommentDetail, LikesContent, RecordContent, RetrieveContent, Schema } from '../constant/interface'

export const recordContent = (data: RecordContent, setData: React.Dispatch<React.SetStateAction<RecordContent>>) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.post('api/v1/bacot/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                "Access-Control-Allow-Headers": 'Content-Type, Origin, Accept, X-Requested-With, Authorization',
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
                type: ContentTypes.RECORD_CONTENT,
                payload: {
                    content: res.data
                }
            })
            setData({
                ...data,
                loading: false,
                description: ''
            })
            const description = (document.getElementById('knd-home-form-bacot') as HTMLTextAreaElement)
            description.value = '';
        }).catch((err: any) => {
            if(err.response.data) {
                setData({
                    ...data,
                    loading: false,
                    description: ''
                })
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

export const contentOpenDialogDestroy = (pk: number, content: Content[]) => {
    return async(dispatch: Dispatch) => {
        const check_content = content.filter(function(x) {
            return x.id === pk
        })
        const response = await dispatch({
            type: ContentTypes.DETAIL_CONTENT_DIALOG,
            payload: {
                openDialog: true,
                detail: check_content[0],
                softDetail: false
            }
        })
        return response
    }
}

export const contentDetailOpenDialogDestroy = (content: Content) => {
    return async(dispatch: Dispatch) => {
        const response = await dispatch({
            type: ContentTypes.DETAIL_CONTENT_DIALOG,
            payload: {
                detail: content,
                openDialog: true,
                softDetail: true
            }
        })
        return response
    }
}

export const destroyContent = (pk: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>, changeRouter: boolean, history: History,is_authenticate: boolean) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.delete(`api/v1/bacot/${pk}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accesss-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With, Authorization',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            setLoading(false)
            if(is_authenticate) {
                dispatch({
                    type: AuthTypes.DESTROY_CONTENT,
                    payload: {
                        id: pk
                    }
                })
            }
            
            dispatch({
                type: ContentTypes.DESTROY_CONTENT,
                payload: {
                    validate: true,
                    message: {
                        message: res.data.message,
                        validate: true
                    },
                    id: pk,
                    openDialog: false
                }
            })
            if(changeRouter) {
                history.push('/')
            }
        }).catch((err: any) => {
            if(err.response.data) {
                setLoading(false)
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

export const contentOpenDialogRetrieve = (pk: number, content: Content[]) => {
    return async (dispatch: Dispatch) => {
        const contents = content.filter(function(x) {
            return x.id === pk
        })
        const response = await dispatch({
            type: ContentTypes.RETRIEVE_CONTENT_DIALOG,
            payload: {
                openRetrieveDialog: true,
                detail: contents[0],
                softDetail: false,
            }
        })
        return response
    }
}

export const contentDetailOpenDialogRetrieve = (content: Content) => {
    return async (dispatch: Dispatch) => {
        const response = await dispatch({
            type: ContentTypes.RETRIEVE_CONTENT_DIALOG,
            payload: {
                detail: content,
                openRetrieveDialog: true,
                softDetail: true
            }
        })
        return response
    }
}

export const retrieveContent = (data: RetrieveContent, setData: React.Dispatch<React.SetStateAction<RetrieveContent>>,softActive: boolean, is_authenticate: boolean) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.put(`api/v1/bacot/${data.pk}/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With, Authorization',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 20000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            if(is_authenticate) {
                dispatch({
                    type: AuthTypes.RETRIEVE_CONTENT,
                    payload: {
                        content: res.data.content,
                        id: res.data.content.id
                    }
                })
            }
            if(softActive) {
                dispatch({
                    type: ContentTypes.DETAIL_CONTENT,
                    payload: {
                        detail: res.data.content
                    }
                })
            }

            dispatch({
                type: ContentTypes.RETRIEVE_CONTENT,
                payload: {
                    content: res.data.content,
                    pk: res.data.content.id,
                    validate: true,
                    message: {
                        message: res.data.message,
                        validate: true
                    },
                    openRetrieveDialog: false
                }
            })
            setData({
                ...data,
                description: '',
                loading: false,
                pk: 0
            })
        }).catch((err: any) => {
            if(err.response.data) {
                setData({
                    ...data,
                    loading: false
                })
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

export const requestLikesContent = (data: LikesContent,is_authenticate: boolean) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.post('api/v1/bacot/likes/content/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With, Authorization',
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
                type: ContentTypes.LIKES_CONTENT,
                payload: {
                    content: res.data,
                    id: res.data.id
                }
            })
            if(is_authenticate) {
                dispatch({
                    type: AuthTypes.RECORD_CONTENT,
                    payload: {
                        content: res.data,
                        id: res.data.id
                    }
                })
            }
            if(data.detail) {
                dispatch({
                    type: ContentTypes.DETAIL_CONTENT,
                    payload: {
                        detail: res.data
                    }
                })
            }
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

export const recordComment = (data: CommentContent, setData: React.Dispatch<React.SetStateAction<CommentContent>>, findIndex: number, is_authenticate: boolean) => {
    return async(dispatch: Dispatch) => {
        const response = await axios.post('api/v1/bacot/comment/content/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, X-Requested-With, Authorization',
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
                type: ContentTypes.COMMENT_CONTENT,
                payload: {
                    content: res.data,
                    id: res.data.id
                }
            })
            if(data.detail) {
                dispatch({
                    type: ContentTypes.DETAIL_CONTENT,
                    payload: {
                        detail: res.data
                    }
                })
            }
            if(is_authenticate) {
                dispatch({
                    type: AuthTypes.RECORD_CONTENT,
                    payload: {
                        content: res.data,
                        id: res.data.id
                    }
                })
            }
            const comments = (document.getElementById(`knd-comments-${findIndex}`) as HTMLTextAreaElement)
            comments.value = '';
            setData({
                ...data,
                comment: '',
                loading: 0,
                detail: false
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

export const detailContent = (pk: number, content: Content[], history: History, validate: Schema) => {
    return async (dispatch: Dispatch) => {
        const check_content = content.filter(function(x) {
            return x.id === pk
        })
        if(check_content[0]) {
            const response = await dispatch({
                type: ContentTypes.MOVE_DETAIL_CONTENT,
                payload: {
                    detail: check_content[0],
                    loadingScreen: false
                }
            })
            history.push({
                pathname: '/detail',
                search: `${check_content[0].public_id}`
            })
            return response
        } else {
            const response_failure = await dispatch({
                type: ContentTypes.FAILURE_CONTENT,
                payload: {
                    validate: true,
                    message: {
                        message: validate.validate.validate_not_found,
                        validate: false
                    }
                }
            })
            return response_failure
        }
    }
}

export const fetchDetailContent = (pk: any, history: History) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get(`api/v1/bacot/custom/detail/${pk}/`, {
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
                type: ContentTypes.DETAIL_CONTENT,
                payload: {
                    detail: res.data,
                    loadingScreen : false
                }
            })
            if(window.location.pathname !== "/detail") {
                dispatch({
                    type: ContentTypes.MOVE_DETAIL_CONTENT,
                    payload: {
                        detail: res.data
                    }
                })
                history.push({
                    pathname: '/detail',
                    search: `${res.data.public_id}`
                })
            }
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

export const destroyComment = (pk: number,comments: DestroyCommentDetail, setComments: React.Dispatch<React.SetStateAction<DestroyCommentDetail>>) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.delete(`api/v1/bacot/comment/content/${pk}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'DELETE',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accepted, Authorization, X-Requested-With',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 2000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            if(comments.detail) {
                dispatch({
                    type: ContentTypes.DESTROY_COMMENT,
                    payload: {
                        content: res.data.content,
                        id: res.data.content.id
                    }
                })
                dispatch({
                    type: ContentTypes.DESTROY_DETAIL_COMMENT,
                    payload: {
                        detail: res.data.content
                    }
                })
            } else {
                dispatch({
                    type: ContentTypes.DESTROY_COMMENT,
                    payload: {
                        content: res.data.content,
                        id: res.data.content.id
                    }
                })
            }
            setComments({
                ...comments,
                loading: 0,
                detail: false
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

export const openDialogReport = (content: Content, active: boolean) => {
    return async (dispatch: Dispatch) => {
        const response = await dispatch({
            type: ContentTypes.DIALOG_REPORT,
            payload: {
                openDialogReport: true,
                detail: content,
                activeReport: active
            }
        })
        return response
    }
}