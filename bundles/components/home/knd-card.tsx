import { Button, Input, Divider, Spin } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../configureStore'
import _ from 'lodash'
import moment from 'moment'
import { CommentContent, FormProps } from '../../constant/interface'
import { contentOpenDialogDestroy, contentOpenDialogRetrieve, recordComment, requestLikesContent } from '../../actions/contentActions'
import { Grow } from '@material-ui/core'
import $ from 'jquery'

const KndCard: React.FunctionComponent = () => {
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

    const handleClickLikesContent = (pk: number) => {
        setIndexComment(-1)
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
        <article id="knd-card">
        {_.map(content, ((base, index) => (
            <div key={index}>
                <div id="knd-card">
                    <div id="knd-card-headers">
                        <Avatar src={base.author.avatar} size="small"/>
                        {options === base.id ? null : (
                            <Grow in={options !== base.id ? true : false}>
                                <a id="knd-card-nickname">{base.author.user ? base.author.user.first_name : ''}</a>
                            </Grow>
                        ) }
                        <div id="knd-card-headers-flex-push"></div>
                        {options === base.id ? (
                            <Grow in={options === base.id ? true : false}>
                                <div id="knd-btn-group">
                                    <div id="knd-btn-options">
                                        <a id="knd-text-options" onClick={handleClickShowDetailContentRetrieve.bind(base, base.id)}>
                                            {fields.button ? fields.button.update : ''}
                                        </a>
                                    </div>
                                    <div id="knd-btn-options" onClick={handleClickShowDetailContent.bind(base, base.id)}>
                                        <a id="knd-text-options">
                                            {fields.button ? fields.button.delete : ''}
                                        </a>
                                    </div>
                                    <div id="knd-btn-options">
                                        <a id="knd-text-options">
                                            Report
                                        </a>
                                    </div>
                                </div> 
                            </Grow>) : null }
                        <Button type="dashed" shape="circle" size="small" className="flex items-center justify-center" onClick={
                            options === base.id ? handleClickCloseOptions : handleClickOptions.bind(base, base.id)
                        }>
                            {options === base. id ? 
                            <Grow in={options === base.id ? true : false}>
                                <i className="fas fa-times-circle"></i>
                            </Grow> : null }
                            {options !== base.id ?
                            <Grow in={options !== base.id ? true : false}>
                                <i className="fas fa-ellipsis-h"></i>
                            </Grow> : null }
                        </Button> 
                        {options !== base.id ?
                        <div id="knd-loader-pretty"></div> : 
                        <div id="knd-loader-pretty-another"></div> }
                    </div>
                    <div id="knd-context">
                        <p id="knd-text">{base.description}</p>
                    </div>
                    <div id="knd-card-actions">
                        <button id="knd-btn-support" onClick={handleClickLikesContent.bind(base, base.id)}>
                            <a id="knd-btn-text-support">
                                <small>{base.like_count}</small>
                                <span>Likes</span>
                                <i className="fas fa-thumbs-up"></i>
                            </a>
                        </button>
                        <button id="knd-btn-support" onClick={handleClickWannaComment.bind(base, base.id)}>
                            <a id="knd-btn-text-support">
                                <small>{base.comment_count}</small>
                                <span>Comment</span>
                                <i className="fas fa-comment-dots"></i>
                            </a>
                        </button>
                    </div>
                    {indexComment === base.id ? 
                    <form onSubmit={onSubmitComment} id="knd-form-comment">
                        <Input.TextArea id="comment-content" placeholder="Comment"/>
                        <div id="knd-btn-group">
                            <button id="knd-btn-submit-comment" type="submit" disabled={wannaComment.loading}>
                                Send Comment
                            </button>
                            <div id="knd-push"></div>
                            {wannaComment.loading ? <Spin/> : null }
                        </div>
                    </form> : null }
                    <div id="knd-card-footer">
                        <span>
                            <i className="fas fa-clock"></i>
                            {moment(base.create_at).fromNow()}
                        </span>
                        <div id="knd-card-face-people-likes">
                            {_.map(base.like, ((baseLikes, indexLikes) => (
                                <div key={indexLikes}>
                                    <Avatar src={baseLikes.author.avatar} size="small" className="knd-card-avatar"/>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
                {base.comment.length >= 1 ? <Divider>Comment</Divider> : null }
                <div id="knd-card-comment">
                    {_.map(base.comment, ((baseComment, indexComment) => (
                        <div id="knd-comment" key={indexComment}>
                            <div id="knd-comment-header">
                                <Avatar src={baseComment.author.avatar} alt="" className="knd-comment-avatar"/>
                                <a id="knd-comment-nickname">
                                    {baseComment.author.user ? baseComment.author.user.first_name : ''}
                                </a>
                                <div id="knd-comment-push"></div>
                                <Button type="dashed" size="small" shape="circle">
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </div>
                            <div id="knd-comment-content">
                                <p>{baseComment.comment}</p>
                            </div>
                            <span id="knd-comment-times">
                                {moment(baseComment.create_at).fromNow()}
                            </span>
                        </div>
                    )))}
                </div>
            </div>
        )))}
    </article>
    )
}

export default KndCard