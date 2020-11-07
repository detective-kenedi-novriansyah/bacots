import { Button, Input } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../configureStore'
import _ from 'lodash'
import moment from 'moment'
import { Divider } from '@material-ui/core'
import { CommentContent, FormProps, RecordContent, TextareaProps } from '../../constant/interface'
import { contentOpenDialogDestroy, contentOpenDialogRetrieve, recordComment, recordContent, requestLikesContent } from '../../actions/contentActions'
import { Grow } from '@material-ui/core'
import $ from 'jquery'

const Home: React.FunctionComponent = () => {
    React.useEffect(() => {
        let mounted = true
        if(mounted) {
            $(document).ready(function() {
                const defaultLength = 500;
                $('#limit-chardkwqm').html(defaultLength.toString() + ' max character limit')
                $(document).on('keyup', '#comment-content', function() {
                    const valueLength = $(this).val().toString().length
                    const attackLength = defaultLength - valueLength
                    $('#limit-chardkwqm').html(attackLength.toString() + ' max character limit')
                    if(valueLength > 500) {
                        $('#limit-chardkwqm').css({
                            'color': 'red',
                            'font-size': '13px'
                        })
                    } else {
                        $('#limit-chardkwqm').css({
                            'color': 'green',
                            'font-size': '13px'
                        })
                    }
                })
            })
        }
    },[])

    const dispatch = useDispatch()
    const [indexComment, setIndexComment] = React.useState<number>(-1)
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const content = useSelector((state: ApplicationState) => state.content.content)
    const [options, setOptions] = React.useState<number>(-1)
    const [wannaComment, setWannaComment] = React.useState<CommentContent>({
        content: 0,
        user: '',
        comment: '',
        loading: false
    })
    const [state, setState] = React.useState<RecordContent>({
        description: '',
        user: '',
        loading: false
    })
    const onChange = (e: TextareaProps) : void => {
        setState({
            ...state,
            description: e.currentTarget.value
        })
    }
    const onSubmit = (e: FormProps) : void => {
        e.preventDefault()
        const user_id = localStorage.getItem('token_id').split('$')[1]
        setState({
            ...state,
            loading: true
        })
        const data = {
            user: user_id,
            description: state.description,
            loading: false
        }
        setTimeout(() => {
            dispatch(recordContent(data,setState))
        }, 500);
    }

    const handleClickLikesContent = (pk: number) => {
        const data = {
            content: pk,
            user: localStorage.getItem('token_id').split('$')[1] as string
        }
        dispatch(requestLikesContent(data))
    }

    const handleClickWannaComment = (pk: number) => {
        setIndexComment(pk)
        setOptions(-1)
    }

    const onSubmitComment = (e: FormProps) : void => {
        e.preventDefault()
        const comment = (document.getElementById('comment-content') as HTMLTextAreaElement)

        setWannaComment({
            ...wannaComment,
            loading: true
        })
        setTimeout(() => {
            const data = {
                content: indexComment,
                user: localStorage.getItem('token_id').split('$')[1],
                comment: comment.value,
                loading: wannaComment.loading
            }
            dispatch(recordComment(data,setWannaComment))
        }, 500);
    }

    const handleClickOptions = (pk: number) => {
        setOptions(pk)
        setIndexComment(-1)
    }

    const handleClickCloseOptions = (e: React.MouseEvent<HTMLButtonElement>) : void => {
        e.preventDefault()
        setOptions(-1)
    }


    const handleClickShowDetailContent = (pk: number) => {
        dispatch(contentOpenDialogDestroy(pk,content))
    }

    const handleClickShowDetailContentRetrieve = (pk: number) => {
        dispatch(contentOpenDialogRetrieve(pk,content))
    }

    return (
        <section>
            <div id="container-content-bacot">
                <div className="row">
                    <div className="col-xs">
                        <div className="box">
                            dkwqmdkwqdqw
                        </div>
                    </div>
                    <div className="col-xs">
                        <form onSubmit={onSubmit}>
                            <div className="field">
                                <div className="control">
                                    <Input.TextArea placeholder={fields.bacot ? fields.bacot.description : ''} value={state.description} onChange={onChange}/>
                                </div>
                            </div>
                            <div className="field flex items-center">
                                <div className="flex-1"></div>
                                <div className="control">
                                    <Button type="dashed" size="small" htmlType="submit" loading={state.loading}>
                                        {fields.button ? fields.button.post : ''}
                                    </Button>
                                </div>
                            </div>
                        </form>
                        <article className="mt-6">
                            {_.map(content, ((base, index) => (
                                <div key={index}>
                                    <div id="custom-card">
                                        <div className="flex items-center">
                                            <Avatar src={base.author.avatar} />
                                            <small className="text-sm font-bold font-sans">{base.author.user ? base.author.user.first_name : ''}</small>
                                            <div className="flex-1"></div>
                                            <Grow in={options === base.id ? true : false}>
                                                <div className="flex items-center">
                                                    <button id="btn-btn" className="bg-white shadow rounded-full py-1 px-2 flex items-center">
                                                        <a className="text-xs text-black font-medium font-sans">Report</a>
                                                    </button>
                                                    <button id="btn-btn" className="bg-white shadow rounded-full py-1 px-2 flex items-center mx-1" onClick={handleClickShowDetailContentRetrieve.bind(base, base.id)}>
                                                        <a className="text-xs text-black font-medium font-sans">{fields.button ? fields.button.update : ''}</a>
                                                    </button>
                                                    <button id="btn-btn" className="bg-white shadow rounded-full py-1 px-2 flex items-center" onClick={handleClickShowDetailContent.bind(base, base.id)}>
                                                        <a className="text-xs text-black font-medium font-sans">{fields.button ? fields.button.delete : ''}</a>
                                                    </button>
                                                </div>
                                            </Grow>
                                            <Button type="dashed" shape="circle" size="small" className="flex items-center justify-center ml-1" onClick={options === base.id ? handleClickCloseOptions : handleClickOptions.bind(base, base.id)}>
                                                {options === base.id ? ( <i className="fas fa-times circle"></i> ): <i className="fas fa-ellipsis-h"></i>}
                                            </Button>
                                        </div>
                                        <Divider className="my-2"/>
                                        <p id={base.description.length >= 1600 ? "dkqwmkdqdmwqkdmwqkdwqdqwdqwd" : "dkqwmkdqdmwqkdmwqk"}>{base.description}</p>
                                        <Divider className="my-2"/>
                                        <div className="flex items-center">
                                            <small className="text-xs"><i className="fas fa-clock mr-1"></i>{moment(base.create_at).fromNow()}</small>
                                            <div className="flex-1"></div>
                                            <div className="flex items-center">
                                                <Button type="dashed" size="small" shape="round" className="mr-1" onClick={handleClickLikesContent.bind(base, base.id)}>
                                                    <small className="mr-1">{base.like_count}</small>
                                                    Likes
                                                    <i className="fas fa-thumbs-up ml-1"></i>
                                                </Button>
                                                <Button type="dashed" shape="round" size="small" className="ml-1" onClick={handleClickWannaComment.bind(base,base.id)}>
                                                    <small className="mr-1">{base.comment_count}</small>
                                                    Comment
                                                    <i className="fas fa-comment-dots ml-1"></i>
                                                </Button>
                                            </div>
                                            <div className="flex-1"></div>
                                            <div id="vector-likes">
                                                {_.map(base.like, ((baseLike, indexLike) => (
                                                    <Avatar size="small" src={baseLike.author.avatar} key={indexLike}/>
                                                )))}
                                            </div>
                                        </div>
                                        {indexComment === base.id ? 
                                        <form onSubmit={onSubmitComment} className="mt-2">
                                            <div className="field">
                                                <div className="control">
                                                    <Input.TextArea placeholder="Comment" id="comment-content" className="rounded" required/>
                                                </div>
                                            </div>
                                            <div className="field has-addons flex items-center">
                                                <div className="control">
                                                    <Button htmlType="submit" loading={wannaComment.loading} type="dashed" shape="round">
                                                        Add Comment
                                                    </Button>
                                                </div>
                                                <div className="flex-1"></div>
                                                <div className="control">
                                                    <span id="limit-chardkwqm"></span>
                                                </div>
                                            </div>
                                        </form> : null }
                                    </div>
                                    <div id="dmqwijdiwqdjiqwdodlwqdqw">
                                        {_.map(base.comment, ((baseComment,indexComment) => (
                                            <div className="bg-white shadow rounded my-1 py-2 px-4 rounded" key={indexComment}>
                                                <div className="flex items-center">
                                                    <Avatar src={baseComment.author.avatar} size="small"/>
                                                    <small className="text-xs ml-1">{baseComment.author.user ? baseComment.author.user.first_name : ''}</small>
                                                    <div className="flex-1"></div>
                                                    <Button size="small" type="dashed" shape="circle">
                                                        <i className="fas fa-trash-alt"></i>
                                                    </Button>
                                                </div>
                                                <p id="dkwqmkdmqkdmwqkmdqwdqw">{baseComment.comment}</p>
                                            </div>
                                        )))}
                                    </div>
                                </div>
                            )))}
                        </article>
                    </div>
                    <div className="col-xs">
                        <div className="box">
                            dkwqmdkwqdqw
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home