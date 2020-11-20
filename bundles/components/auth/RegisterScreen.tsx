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
        <section className="knd-x-form-x">
            <form onSubmit={onSubmit} className="knd-x-form-register">
                <div className="knd-form-x-t">
                    <div className="knd-form-x-title">
                        {fields.button ? fields.button.title_register : ''}
                    </div>
                    <div className="knd-form-x-child-title">
                        {fields.button ? fields.button.child_title_register : ''}
                    </div>
                </div>
                <div className="knd-x-form-field">
                    <i className="fas fa-user-circle"></i>
                    <input type="text" name="username" id="knd-form-username-field" className="knd-form-username-field" placeholder={fields.auth ? fields.auth.user.username : ''} value={state.username} onChange={onChange}/>
                </div>
                <div className="knd-x-form-field">
                    <i className="fas fa-envelope"></i>
                    <input type="email" name="email" id="email" className="knd-form-email-field" placeholder={fields.auth ? fields.auth.user.email : ''} onChange={onChange} value={state.email}/>
                </div>
                <div className="knd-x-form-field-va">
                    <p>{fields.auth ? fields.auth.user.password_regex : ''}</p>
                </div>
                <div className="knd-x-form-field">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="password" id="knd-form-password-field" className="knd-form-password-field" placeholder={fields.auth ? fields.auth.user.password : ''} value={state.password} onChange={onChange}/>
                </div>
                <div className="knd-x-form-field">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="confirm_password" id="knd-form-confirm-password-field" className="knd-form-confirm-password-field" value={state.confirm_password} onChange={onChange} placeholder={fields.auth ? fields.auth.user.confirm_password : ''}/>
                </div>
                <div className="knd-x-form-field-button">
                    <a onClick={handleClickHistory.bind('','/forgot')}>
                        {fields.button ? fields.button.forgot : ''}
                    </a>
                </div>
                <div className="knd-x-form-field-group">
                    <button type="submit" disabled={state.loading}>
                        {fields.button ? fields.button.register : ''}
                    </button>
                    <a onClick={handleClickHistory.bind('','/signin')}>
                        {fields.button ? fields.button.already_account : ''}
                    </a>
                </div>
            </form>
        </section>
    )
}

export default RegisterScreen