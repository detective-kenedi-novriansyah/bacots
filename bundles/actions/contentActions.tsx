import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import { ContentTypes } from '../constant/contentSchema'
import { CommentContent, Content, LikesContent, RecordContent, RetrieveContent } from '../constant/interface'

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
        console.log(check_content)
        const response = await dispatch({
            type: ContentTypes.DETAIL_CONTENT_DIALOG,
            payload: {
                openDialog: true,
                detail: check_content[0]
            }
        })
        return response
    }
}

export const destroyContent = (pk: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
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
                detail: contents[0]
            }
        })
        return response
    }
}

export const retrieveContent = (data: RetrieveContent, setData: React.Dispatch<React.SetStateAction<RetrieveContent>>) => {
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

export const requestLikesContent = (data: LikesContent) => {
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

export const recordComment = (data: CommentContent, setData: React.Dispatch<React.SetStateAction<CommentContent>>) => {
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
            setData({
                ...data,
                comment: '',
                loading: false
            })
            const comment = (document.getElementById('comment-content') as HTMLTextAreaElement)
            comment.value = '';
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