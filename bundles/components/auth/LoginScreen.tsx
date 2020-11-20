import { Button, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { requestUser } from '../../actions/userActions'
import { ApplicationState } from '../../configureStore'
import { FormProps, InputProps, LoginUser } from '../../constant/interface'

const LoginScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const [state, setState] = React.useState<LoginUser>({
        username: '',
         password: '',
         loading: false
    })
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const history = useHistory()

    const handleClickHistory = (newValue: string) : void => {
        history.push(newValue)
    }

    const onChange = (e: InputProps) : void => {
        if(e.currentTarget.name === "username") {
            setState({
                ...state,
                username: e.currentTarget.value
            })
        } else {
            setState({
                ...state,
                password: e.currentTarget.value
            })
        }
    }

    const onSubmit = (e: FormProps) : void => {
        e.preventDefault()
        setState({
            ...state,
            loading: true
        })
        setTimeout(() => {
            dispatch(requestUser(state,setState))
        }, 500);
    }
    return (
        <section className="knd-x-form-x">
            <form onSubmit={onSubmit} className="knd-x-form-register">
                <div className="knd-form-x-t">
                    <div className="knd-form-x-title">
                        {fields.button ? fields.button.title_login : ''}
                    </div>
                </div>
                <div className="knd-x-form-field">
                    <i className="fas fa-user-circle"></i>
                    <input type="text" name="username" id="knd-form-username-field" className="knd-form-username-field" placeholder={fields.auth ? fields.auth.user.username : ''} value={state.username} onChange={onChange}/>
                </div>
                <div className="knd-x-form-field">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="password" id="knd-form-password-field" className="knd-form-password-field" placeholder={fields.auth ? fields.auth.user.password : ''} value={state.password} onChange={onChange}/>
                </div>
                <div className="knd-x-form-field-button">
                    <a onClick={handleClickHistory.bind('','/forgot')}>
                        {fields.button ? fields.button.forgot : ''}
                    </a>
                </div>
                <div className="knd-x-form-field-group">
                    <button type="submit" disabled={state.loading}>
                        {fields.button ? fields.button.login : ''}
                    </button>
                    <a onClick={handleClickHistory.bind('','/signup')}>
                        {fields.button ? fields.button.create_new_account : ''}
                    </a>
                </div>
            </form>
        </section>
    )
}

export default LoginScreen