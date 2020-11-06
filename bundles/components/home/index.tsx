import { Button, Dropdown, Input, Menu } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../configureStore'
import _ from 'lodash'
import moment from 'moment'
import { Content, FormProps, InputProps, RecordContent, Schema, TextareaProps } from '../../constant/interface'
import { contentOpenDialogDestroy, contentOpenDialogRetrieve, recordContent } from '../../actions/contentActions'

interface OptionsProps {
    content: Content;
    fullContent: Content[];
    fields: Schema;
}

const Options: React.FunctionComponent<OptionsProps> = (props: React.PropsWithChildren<OptionsProps>) => {
    const dispatch = useDispatch()

    const handleClickShowDetailContent = (pk: number) => {
        dispatch(contentOpenDialogDestroy(pk,props.fullContent))
    }

    const handleClickShowDetailContentRetrieve = (pk: number) => {
        dispatch(contentOpenDialogRetrieve(pk,props.fullContent))
    }
    return (
        <Menu>
            <Menu.Item onClick={handleClickShowDetailContentRetrieve.bind(props.content, props.content.id)}>
                <a target="_blank" rel="noopener noreferrer">
                    {props.fields.button ? props.fields.button.update : ''}
                </a>
            </Menu.Item>
            <Menu.Item onClick={handleClickShowDetailContent.bind(props.content,props.content.id)}>
                <a target="_blank" rel="noopener noreferrer">
                    {props.fields.button ? props.fields.button.delete : ''}
                </a>
            </Menu.Item>
        </Menu>
    )
}

const Home: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const content = useSelector((state: ApplicationState) => state.content.content)
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
    return (
        <section>
            <div id="container-content-bacot">
                <div className="row">
                    <div className="col-xs-4">
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
                                <div key={index} className="bg-white shadow rounded my-1 p-2 break-all">
                                    <div className="flex items-center">
                                        <Avatar src={base.author.avatar}/>
                                        <Button type="link">
                                            {base.author.user ? base.author.user.first_name : ''}
                                        </Button>
                                        <div className="flex-1"></div>
                                        <div className="flex items-center">
                                            <small className="mr-2">
                                                {moment(base.create_at).fromNow()}
                                            </small>
                                            <Dropdown overlay={<Options fields={fields} content={base} fullContent={content}/>} trigger={['click']} placement="bottomRight">
                                                <Button type="dashed" shape="circle" className="flex items-center justify-center" size="small" onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}>
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </Button>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <p className="text-sm font-sans">{base.description}</p>
                                    <div className="my-1 flex items-center">
                                        <div id="content-bacot-list-author-list">
                                            <div className="flex items-center">
                                                {_.map(base.like, ((base_likes, index_likes) => (
                                                    <Avatar src={base_likes.author.avatar} key={index_likes} size="small" className="cursor-pointer"/>
                                                )))}
                                            </div>
                                        </div>
                                        <div className="flex-1"></div>
                                        <Button type="dashed" shape="round" size="small" className="mr-1">
                                            <small className="mr-1">
                                                {base.like_count}
                                            </small>
                                            Likes
                                        </Button>
                                        <Button type="dashed" shape="round" size="small">
                                            <small className="mr-1">
                                                {base.comment_count}
                                            </small>
                                            Comment
                                        </Button>
                                    </div>
                                </div>
                            )))}
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home