import { Button, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { recordUser } from '../../actions/userActions'
import { ApplicationState } from '../../configureStore'
import { FormProps, InputProps, RecordUser } from '../../constant/interface'

const RegisterScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const [state, setState] = React.useState<RecordUser>({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        loading: false
    })

    const onChange = (e: InputProps) : void => {
        switch (e.currentTarget.name) {
            case "username":
                setState({
                    ...state,
                    username: e.currentTarget.value
                })
                break;
            case "email":
                setState({
                    ...state,
                    email: e.currentTarget.value
                })
                break
            case "password":
                setState({
                    ...state,
                    password: e.currentTarget.value
                })
                break
            case "confirm_password":
                setState({
                    ...state,
                    confirm_password: e.currentTarget.value
                })
                break
            default:
                break;
        }
    }

    const onSubmit = (e: FormProps) : void => {
        e.preventDefault()
        setState({
            ...state,
            loading: true
        })
        setTimeout(() => {
            dispatch(recordUser(state,setState,history))
        }, 500);
    }

    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const history = useHistory()

    const handleClickHistory = (newValue: string) : void => {
        history.push(newValue)
    }

    return (
        <section id="dkwqmkdqw">
            <div id="col-1" className="flex items-center justify-center">
                <form onSubmit={onSubmit}>
                    <div className="field">
                        <div className="control">
                            <h1 id="title">
                                {fields.button ? fields.button.title_register : ''}
                            </h1>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <h2 id="sub-title">
                                {fields.button ? fields.button.child_title_register : ''}
                            </h2>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control is-expanded">
                            <Input type="text" placeholder={fields.auth ? fields.auth.user.username : ''} name="username" id="username" autoComplete="off" value={state.username} onChange={onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control is-expanded">
                            <Input type="email" placeholder={fields.auth ? fields.auth.user.email : ''} name="email" id="email" autoComplete="off" value={state.email} onChange={onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control is-expanded">
                            <Input type="password" placeholder={fields.auth ? fields.auth.user.password : ''} name="password" id="password" autoComplete="off" value={state.password} onChange={onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <div id="content-regex">
                                <p className="text-sm font-sans">
                                    {fields.auth ? fields.auth.user.password_regex : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control is-expanded">
                            <Input type="password" placeholder={fields.auth ? fields.auth.user.confirm_password : ''} name="confirm_password" id="confirm_password" autoComplete="off" value={state.confirm_password} onChange={onChange}/>
                        </div>
                    </div>
                    <div className="field has-addons flex items-center">
                        <div className="control">
                            <Button type="dashed" htmlType="submit" loading={state.loading}>
                                {fields.button ? fields.button.register : ''}
                            </Button>
                        </div>
                        <div className="control ml-2">
                            <Button type="link" onClick={handleClickHistory.bind('','/signin')}>
                                {fields.button ? fields.button.already_account : ''}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <div id="col" className="bg-white shadow">
                dwqdqw
            </div>
        </section>
    )
}

export default RegisterScreen